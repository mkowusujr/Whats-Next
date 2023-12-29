const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');
const movier = require('movier');

exports.add = async media => {
  return new Promise(async (resolve, reject) => {
    const imdbInfo = await movier.getTitleDetailsByName(media.name);
    const titleCase = name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    db.run(
      `
    INSERT INTO media(
      name,
      watchStatus,
      personalRating,
      dateStarted,
      dateCompleted,
      posterImageUrl,
      releaseDate,
      mediaType,
      genres,
      directors,
      writers,
      imdbRating,
      plot,
      cast,
      runtime,
      dateAdded)
    VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        imdbInfo.name,
        media.watchStatus,
        media.personalRating,
        media.dateStarted,
        media.dateCompleted,
        imdbInfo.posterImage.url,
        imdbInfo.dates.startDate,
        titleCase(imdbInfo.mainType),
        `${imdbInfo.genres}`,
        `${JSON.stringify(imdbInfo.directors)}`,
        `${JSON.stringify(imdbInfo.writers)}`,
        imdbInfo.mainRate.rate,
        imdbInfo.plot,
        `${JSON.stringify(imdbInfo.casts)}`,
        imdbInfo.runtime.title,
        new Date().toLocaleDateString()
      ],
      function (err) {
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
      }
    );
  });
};

exports.list = mediaTypes => {
  const selectStmt = `SELECT * FROM media WHERE mediaType IN ('${mediaTypes.join(
    "','"
  )}')`;
  console.log(selectStmt);

  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
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
        if (err)
        {
          console.log("err " + err)
          reject(err);
        }
      });
      db.get(
        `select * from media where id = ?`,
        media.id,
        function (_, row) {
          resolve(row);
        }
      );
    })
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
