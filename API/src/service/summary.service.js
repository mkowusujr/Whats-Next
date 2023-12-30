const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

const sortByScore = (a, b) => a.score - b.score;

const findNullPRating = m => m.r == 'Select Personal Rating';

const dateCheck = (from, to, check) => {
  let fDate, tDate, cDate;
  fDate = Date.parse(from);
  tDate = Date.parse(to);
  cDate = Date.parse(check);

  if (cDate <= tDate && cDate >= fDate) {
    return true;
  }
  return false;
};

const getCompleted = () => {
  const selectStmt = `
  SELECT
    m.id,
    m.title,
    m.subTitle,
    m.mediaType,
    m.score,
    m.storage,
		m.status
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
		m.status
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
    storage 
  FROM media 
  WHERE status='Planned'
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
