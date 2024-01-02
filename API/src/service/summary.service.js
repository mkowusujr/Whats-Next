const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

const getCompleted = () => {
  const selectStmt = `
  SELECT
    m.id,
    m.title,
    m.subTitle,
    m.mediaType,
    m.score,
    m.storage,
		m.status,
    m.img,
    m.summary
  FROM media m
  left join progress p on p.mediaID = m.id
  WHERE status='Completed'
  ORDER BY p.dateStarted
  LIMIT 10
  `;
  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

const getInprogress = () => {
  const selectStmt = `
  SELECT
    m.id,
    m.title,
    m.subTitle,
    m.mediaType,
    m.score,
    m.storage,
		m.status,
    m.img,
    m.summary
  FROM media m
  left join progress p on p.mediaID = m.id
  WHERE status='In Progress'
  ORDER BY dateStarted
  `;
  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

const getPlanned = () => {
  const selectStmt = `
  SELECT 
    id, 
    title, 
    subTitle, 
    mediaType, 
    score, 
    storage,
    img,
    summary
  FROM media 
  WHERE status='Planned'
  ORDER BY dateCreated
  LIMIT 10
  `;
  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

const getNotes = () => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `SELECT * FROM notes ORDER BY dateCreated DESC LIMIT 10`,
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

exports.getSummary = async () => {
  return {
    completed: await getCompleted(),
    inprogress: await getInprogress(),
    planned: await getPlanned(),
    notes: await getNotes()
  };
};
