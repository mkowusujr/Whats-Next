const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');

exports.add = async note => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
			INSERT INTO notes(
				title,
				content,
				mediaID,
				dateAdded
			)
			values(?, ?, ?, ?)
			`,
      [note.title, note.content, note.mediaID, new Date().toLocaleDateString()],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from notes where id = ?`,
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

exports.listForMedia = async mediaID => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `SELECT * FROM notes WHERE mediaID = ?`,
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

exports.listForBook = async bookID => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `SELECT * FROM notes WHERE bookID = ?`,
      bookID,
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

exports.update = async note => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
			UPDATE notes
			SET title = ?, content = ?, mediaID = ?, lastUpdated = ?
			WHERE id = ?
			`,
      [
        note.title,
        note.content,
        note.mediaID,
        new Date().toLocaleDateString(),
        note.id
      ],
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
