const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

/**
 * Updates progress information in the database.
 * @param {Object} progress - The progress object containing updated information.
 * @param {number} progress.current - The current progress value.
 * @param {number} progress.total - The total progress value.
 * @param {string} progress.unit - The unit of progress.
 * @param {string} progress.dateStarted - The date when the progress started.
 * @param {string} progress.dateCompleted - The date when the progress was completed.
 * @param {number} progress.id - The ID of the progress entry to update.
 * @returns {Promise<Object>} A promise that resolves with the updated progress object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.update = async progress => {
  const updateStmt = `
    UPDATE progress
    SET current = ?,
    total = ?,
    unit = ?,
    dateStarted = ?,
    dateCompleted = ?
    WHERE id = ?
    `;

  const updateData = [
    progress.current,
    progress.total,
    progress.unit,
    progress.dateStarted,
    progress.dateCompleted,
    progress.id
  ];

  return new Promise(async (resolve, reject) => {
    db.serialize(() => {
      db.run(updateStmt, updateData, function (err) {
        if (err) console.log(err);
      });

      db.get(
        `select * from progress WHERE id = ?`,
        progress.id,
        function (err, row) {
          resolve(row);
        }
      );
    });
  });
};

/**
 * Retrieves progress information from the database based on progress ID.
 * @param {number} progressID - The ID of the progress entry to retrieve.
 * @returns {Promise<Object>} A promise that resolves with the progress object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.get = async progressID => {
  return new Promise(async (resolve, reject) => {
    db.get(
      `SELECT * FROM progress WHERE id = ?`,
      progressID,
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

/**
 * Retrieves progress information from the database based on media ID.
 * @param {number} mediaID - The ID of the media entry associated with the progress.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of progress objects.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.getForMedia = async mediaID => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM progress
      WHERE mediaID = ?
      ORDER BY dateStarted DESC
      `,
      mediaID,
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

/**
 * Deletes progress information from the database based on progress ID.
 * @param {number} progressID - The ID of the progress entry to delete.
 * @returns {Promise<string>} A promise that resolves with a success message upon successful deletion.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.delete = progressID => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
    DELETE FROM progress
    WHERE id = ?
    `,
      progressID,
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

/**
 * Adds progress information to the database.
 * @param {Object} progress - The progress object containing information to be added.
 * @param {number} progress.current - The current progress value.
 * @param {number} progress.total - The total progress value.
 * @param {string} progress.unit - The unit of progress.
 * @param {string} progress.dateStarted - The date when the progress started.
 * @param {string} progress.dateCompleted - The date when the progress was completed.
 * @param {number} progress.mediaID - The ID of the media entry associated with the progress.
 * @returns {Promise<Object>} A promise that resolves with the added progress object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.add = async progress => {
  const insertStmt = `
      INSERT INTO progress(
        current,
        total,
        unit,
        dateStarted,
        dateCompleted,
        mediaID
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `;

  const insertData = [
    progress.current,
    progress.total,
    progress.unit,
    progress.dateStarted,
    progress.dateCompleted,
    progress.mediaID
  ];

  return new Promise(async (resolve, reject) => {
    db.run(insertStmt, insertData, function (err) {
      _ = err ? reject(err) : resolve({ id: this.lastID, ...progress });
    });
  });
};
