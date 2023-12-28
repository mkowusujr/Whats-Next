const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');

const createProgressTracker = async progress => {
  return new Promise(async (resolve, reject) => {
    try {
      db.run(
        `
      INSERT INTO progress(
        current,
        total,
        unit
      )
      VALUES (?, ?, ?)
      `,
        [progress.current, progress.total, progress.unit],
        async function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

exports.update = async progress => {
  return new Promise(async (resolve, reject) => {
    try {
      db.run(
        `
      UPDATE progress
			SET current = ?,
      total = ?,
      unit = ?
			where id = ?
      `,
        [progress.current, progress.total, progress.unit, progress.id],
        async function (err) {
          if (err) {
            reject(err);
          } else {
            db.get(
              `select * from progress where id = ?`,
              progress.id,
              function (err, row) {
                resolve(row);
              }
            );
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

exports.get = async progressID => {
  return new Promise(async (resolve, reject) => {
    db.get(
      `SELECT * FROM progress where id = ?`,
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

exports.add = async (type, itemID, progress) => {
  const progressTrackerID = await createProgressTracker(progress);
  if (type == 'media') {
    return new Promise(async (resolve, reject) => {
      db.run(
        `
				UPDATE media
				SET progressID = ?
				WHERE id = ?
    `,
        [progressTrackerID, itemID],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(progressTrackerID);
          }
        }
      );
    });
  } else if (type == 'book') {
    return new Promise(async (resolve, reject) => {
      db.run(
        `
				UPDATE books
				SET progressID = ?
				WHERE id = ?
    `,
        [progressTrackerID, itemID],
        async function (err) {
          if (err) {
            reject(err);
          } else {
            const newProgress = await this.get(progressTrackerID)
            resolve(newProgress)
          }
        }
      );
    });
  }
};
