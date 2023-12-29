const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

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

exports.add = async progress => {
  const insertStmt =
    `
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
  ]
  console.log(insertData)
  return new Promise(async (resolve, reject) => {
    db.run(
      insertStmt,
      insertData,
      function (err) {
        _ = (err) ?
          reject(err) : resolve({ id: this.lastID, ...progress})
      }
    );
  });
}

