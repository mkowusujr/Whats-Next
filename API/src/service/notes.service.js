const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

/**
 * Adds a new note to the database.
 * @param {Object} note - The note object containing information to be added.
 * @param {string} note.title - The title of the note.
 * @param {string} note.content - The content of the note.
 * @param {number} note.mediaID - The ID of the media entry associated with the note.
 * @returns {Promise<Object>} A promise that resolves with the added note object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.add = async note => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
			INSERT INTO notes(
				title,
				content,
				mediaID,
				dateCreated,
        dateLastUpdated
			)
			values(?, ?, ?, ?, ?)
			`,
      [
        note.title,
        note.content,
        note.mediaID,
        new Date().toLocaleDateString(),
        new Date().toLocaleDateString()
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from notes where id = ?`,
            this.lastID,
            function (_, row) {
              resolve(row);
            }
          );
        }
      }
    );
  });
};

/**
 * Retrieves a note from the database based on note ID.
 * @param {number} noteID - The ID of the note entry to retrieve.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing 
 * the retrieved note object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.get = async noteID => {
  return new Promise(async (resolve, reject) => {
    db.all(`SELECT * FROM notes WHERE id = ?`, noteID, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Retrieves a list of all notes from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing all notes, 
 * ordered by dateCreated.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.list = async () => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `SELECT * FROM notes ORDER BY dateCreated DESC`,
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
 * Retrieves a list of notes associated with a specific media ID from the database.
 * @param {number} mediaID - The ID of the media entry associated with the notes.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing 
 * notes associated with the specified media ID, ordered by dateCreated.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.listForMedia = async mediaID => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM notes
      WHERE mediaID = ?
      ORDER BY dateCreated DESC
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
 * Updates a note in the database.
 * @param {Object} note - The note object containing updated information.
 * @param {string} note.title - The updated title of the note.
 * @param {string} note.content - The updated content of the note.
 * @param {number} note.id - The ID of the note entry to update.
 * @returns {Promise<Object>} A promise that resolves with the updated note object.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.update = async note => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
			UPDATE notes
			SET title = ?, content = ?, dateLastUpdated = ?
			WHERE id = ?
			`,
      [note.title, note.content, new Date().toLocaleDateString(), note.id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from notes where id = ?`,
            note.id,
            function (err, row) {
              resolve(row);
            }
          );
        }
      }
    );
  });
};

/**
 * Deletes a note from the database based on note ID.
 * @param {number} mediaID - The ID of the note entry to delete.
 * @returns {Promise<string>} A promise that resolves with a success message upon successful deletion.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.delete = async mediaID => {
  return new Promise(async (resolve, reject) => {
    db.run(`DELETE FROM notes WHERE id = ?`, mediaID, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve('Success');
      }
    });
  });
};
