const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');
const movier = require('movier');
const gbookFinder = require('@chewhx/google-books');
const fetch = require('node-fetch');

/**
 * Adds a new media entry to the database.
 * @param {Object} media - The media object containing information to be added.
 * @param {string} media.title - The title of the media.
 * @param {string} media.subTitle - The subtitle of the media (optional).
 * @param {string} media.mediaType - The type of media (e.g., Movie, Series, Graphic Novels, Fiction).
 * @param {number} media.score - The score of the media.
 * @param {string} media.status - The status of the media.
 * @returns {Promise<Object>} A promise that resolves with the added media object.
 * @throws {Error} Throws an error if there is an issue with the creation process.
 */
exports.add = async media => {
  const mediaInfo = await fetchInfo(media);

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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

/**
 * Retrieves a list of media entries from the database based on media types.
 * @param {Array<string>} mediaTypes - An array of media types to filter the result.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing the retrieved 
 * media objects.
 * @throws {Error} Throws an error if there is an issue with the select process.
 */
exports.list = mediaTypes => {
  const selectStmt = `SELECT * FROM media WHERE mediaType IN ('${mediaTypes.join(
    "','"
  )}')`;

  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

/**
 * Retrieves additional information for a media entry using external sources.
 * @param {Object} media - The media object for which additional information is needed.
 * @returns {Promise<Object>} A promise that resolves with additional information for the media entry.
 * @throws {Error} Throws an error if there is an issue with the fetch process.
 */
const fetchInfo = async media => {
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
        releaseDate: new Date(imdbInfo.dates.startDate)
          .toISOString()
          .split('T')[0]
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
};

/**
 * Retrieves information for a media entry from the database based on media ID.
 * @param {number} mediaID - The ID of the media entry to retrieve information.
 * @returns {Promise<Object>} A promise that resolves with information for the specified media entry.
 * @throws {Error} Throws an error if there is an issue with the select process.
 */
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

/**
 * Updates a media entry in the database.
 * @param {Object} media - The media object containing updated information.
 * @param {string} media.title - The updated title of the media.
 * @param {string} media.subTitle - The updated subtitle of the media.
 * @param {string} media.status - The updated status of the media.
 * @param {number} media.score - The updated score of the media.
 * @param {string} media.storage - The updated storage information for the media.
 * @param {string} media.releaseDate - The updated release date of the media.
 * @param {number} media.id - The ID of the media entry to update.
 * @returns {Promise<Object>} A promise that resolves with the updated media object.
 * @throws {Error} Throws an error if there is an issue with the update process.
 */
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

/**
 * Deletes a media entry from the database based on media ID.
 * @param {number} mediaID - The ID of the media entry to delete.
 * @returns {Promise<string>} A promise that resolves with a success message upon successful deletion.
 * @throws {Error} Throws an error if there is an issue with the deletion process.
 */
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
