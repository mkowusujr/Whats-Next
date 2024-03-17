const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_URL);

/**
 * Retrieves information about completed media items from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of completed media objects.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
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
  ORDER BY m.dateLastUpdated
  LIMIT 10
  `;
  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

/**
 * Retrieves information about in-progress media items from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of in-progress media objects.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
const getInprogress = () => {
  const selectStmt = `
  SELECT
  m.id,
    m.title,
    m.subTitle,
    m.mediaType,
    m.storage,
		m.status,
    m.img,
    m.summary,
    p.id as pID,
    p.title as progressTitle,
    p.current,
    p.total,
    p.unit,
    p.dateStarted,
    p.dateCompleted,
    p.mediaID
  FROM media m
  left join progress p on p.mediaID = m.id
  WHERE m.status='In Progress'
	AND p.dateStarted = (
  	SELECT MAX(dateStarted)
  	FROM progress
  	WHERE mediaID = m.id
	)
  ORDER BY p.dateStarted
  `;
  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

/**
 * Retrieves information about planned media items from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of planned media objects.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
const getPlanned = () => {
  const selectStmt = `
  SELECT 
    id, 
    title, 
    subTitle, 
    mediaType, 
    storage,
    status,
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

/**
 * Retrieves information about notes, including details about the associated media item (if any).
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of note objects.
 * @throws {Error} Throws an error if there is an issue with the select process.
 */
const getNotes = () => {
  return new Promise(async (resolve, reject) => {
    db.all(
      `
      SELECT
        n.id,
        n.title,
        n.content,
        n.mediaID,
        n.dateCreated,
        n.dateLastUpdated,
        m.title as mediaTitle,
        m.subTitle as mediaSubtitle,
        m.img
      FROM notes n
      LEFT JOIN media m on n.mediaID = m.id 
      ORDER BY n.dateCreated DESC LIMIT 10`,
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
 * Retrieves a summary of completed, in-progress, planned media, and notes.
 * @returns {Promise<Object>} A promise that resolves with an object containing summaries
 * for completed, in-progress, planned media, and notes.
 * @throws {Error} Throws an error if there is an issue with the process.
 */
exports.getSummary = async () => {
  return {
    completed: await getCompleted(),
    inprogress: await getInprogress(),
    planned: await getPlanned(),
    notes: await getNotes()
  };
};
