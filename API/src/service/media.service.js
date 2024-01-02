const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');
const movier = require('movier');
const gbookFinder = require('@chewhx/google-books');
const fetch = require('node-fetch');

exports.add = async media => {
  const mediaInfo = await fetchInfo(media)

  return new Promise(async (resolve, reject) => {
    const titleCase = name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const insertStmt = `
    INSERT INTO media(
      title,
      subTitle,
      mediaType,
      score,
      status,
      dateCreated,
      img,
      creator,
      summary,
      releaseDate
      )
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    const insertData = [
      titleCase(media.title),
      titleCase(media.subTitle),
      media.mediaType,
      media.score,
      media.status,
      new Date().toLocaleDateString(),
      mediaInfo.img,
      mediaInfo.creator,
      mediaInfo.summary,
      mediaInfo.releaseDate
    ];

    db.run(insertStmt, insertData, function (err) {
      if (err) {
        reject(err);
      } else {
        db.get(
          `select * from media where id = ?`,
          this.lastID,
          function (err, row) {
            resolve(row);
          }
        );
      }
    });
  });
};

exports.list = mediaTypes => {
  const selectStmt = `SELECT * FROM media WHERE mediaType IN ('${mediaTypes.join(
    "','"
  )}')`;

  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

async function fetchInfo(media) {
  const mediaTitle = media.title + (media.subTitle ?? '');

  let mediaInfo = {};
  switch (media.mediaType) {
    case 'Movie':
    case 'Series':
      const imdbInfo = await movier.getTitleDetailsByName(mediaTitle);
      mediaInfo = {
        img: imdbInfo.posterImage.url,
        creator: imdbInfo.directors[0].name,
        summary: imdbInfo.plot,
        releaseDate: imdbInfo.dates.startDate
      };

      return mediaInfo;
    case 'Graphic Novels':
    case 'Fiction':
      try {
        const gBooks = await gbookFinder.search({ q: mediaTitle });
        const gBook = gBooks.items[0].volumeInfo;
        const r1 = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${gBooks.items[0].id}`
        );
        const f1 = await r1.json();

        let coverImg = f1.volumeInfo.imageLinks.medium;

        mediaInfo = {
          img:
            coverImg ??
            'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
          creator: gBook.authors ? gBook.authors.join(',') : '',
          summary: gBook.description,
          releaseDate: gBook.publishedDate
        };

        return mediaInfo;
      } catch (err) {
        console.log(err.message);
      }
  }
}

exports.getInfo = mediaID => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      select
        img, creator, summary, releaseDate
      from media
      WHERE id = ?`,
      mediaID,
      async function (err, row) {
        _ = err ? reject(err) : resolve(row);
      }
    );
  });
};

exports.update = media => {
  const updateStmt = `
    UPDATE media
    SET
    title = ?,
    subTitle = ?,
    status = ?,
    score = ?, 
    storage = ?,
    releaseDate = ?,
    dateLastUpdated = ?
    WHERE id = ?
    `;

  let updateData = [
    media.title,
    media.subTitle,
    media.status,
    media.score,
    media.storage,
    media.releaseDate,
    new Date().toLocaleDateString(),
    media.id
  ];

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(updateStmt, updateData, function (err) {
        if (err) {
          reject(err);
        }
      });
      db.get(`select * from media where id = ?`, media.id, function (_, row) {
        resolve(row);
      });
    });
  });
};

exports.delete = mediaID => {
  return new Promise((resolve, reject) => {
    db.run(
      `
    DELETE FROM media
    WHERE id = ?
    `,
      mediaID,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve('Success');
        }
      }
    );
  });
};
