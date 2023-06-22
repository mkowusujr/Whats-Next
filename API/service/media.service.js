const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./watchnext.db");
const movier = require("movier");

const dbInit = () =>
  db.serialize(() => {
    db.run(
      `
		CREATE TABLE IF NOT EXISTS media(
			id INTEGER PRIMARY KEY,
			name STRING NOT NULL,
			watchStatus STRING NOT NULL,
			personalRating DOUBLE,
			dateStarted DATE,
			dateCompleted DATE,
      posterImageUrl STRING NOT NULL,
      releaseDate STRING NOT NULL,
      mediaType STRING NOT NULL,
      genres STRING NOT NULL,
      directors STRING NOT NULL,
      writers STRING NOT NULL,
      imdbRating STRING NOT NULL,
      plot STRING NOT NULL,
      cast STRING NOT NULL,
      runtime STRING NOT NULL
		)
		`
    );
  });

exports.add = async (media) => {
  return new Promise(async (resolve, reject) => {
    dbInit();

    const imdbInfo = await movier.getTitleDetailsByName(media.name);
    const titleCase = (name) => {
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
      runtime)
    VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

exports.list = (filters) => {
  return new Promise((resolve, reject) => {
    dbInit();

    db.all(
      `
      SELECT *
      FROM media
      `,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

exports.update = (media) => {
  return new Promise((resolve, reject) => {
    dbInit();

    db.run(
      `
    UPDATE media
    SET watchStatus = ?, personalRating = ?, dateStarted = ?, dateCompleted = ?
    WHERE id = ?
    `,
      [
        media.watchStatus,
        media.personalRating,
        media.dateStarted,
        media.dateCompleted,
        media.id,
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from media where id = ?`,
            media.id,
            function (err, row) {
              resolve(row);
            }
          );
        }
      }
    );
  });
};

exports.delete = (mediaID) => {
  return new Promise((resolve, reject) => {
    dbInit();

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
          resolve("Success");
        }
      }
    );
  });
};