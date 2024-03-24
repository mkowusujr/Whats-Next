const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_URL);


const getStats = () => {
  const selectStmt = `
  SELECT
  SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS totalMediaCompleted,
  SUM(CASE WHEN mediaType = 'Series' AND status = 'Completed' THEN 1 ELSE 0 END) AS totalSeriesCompleted,
  SUM(CASE WHEN mediaType = 'Movie' AND status = 'Completed' THEN 1 ELSE 0 END) AS totalMoviesCompleted,
  SUM(CASE WHEN mediaType = 'Graphic Novels' AND status = 'Completed' THEN 1 ELSE 0 END) AS totalGraphicNovelsCompleted,
  SUM(CASE WHEN mediaType = 'Book' AND status = 'Completed' THEN 1 ELSE 0 END) AS totalBookCompleted,

  SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) AS totalMediaInProgress,
  SUM(CASE WHEN mediaType = 'Series' AND status = 'In Progress' THEN 1 ELSE 0 END) AS totalSeriesInProgress,
  SUM(CASE WHEN mediaType = 'Movie' AND status = 'In Progress' THEN 1 ELSE 0 END) AS totalMoviesInProgress,
  SUM(CASE WHEN mediaType = 'Graphic Novels' AND status = 'In Progress' THEN 1 ELSE 0 END) AS totalGraphicNovelsInProgress,
  SUM(CASE WHEN mediaType = 'Book' AND status = 'In Progress' THEN 1 ELSE 0 END) AS totalBookInProgress,

  SUM(CASE WHEN status = 'Planned' THEN 1 ELSE 0 END) AS totalMediaPlanned,
  SUM(CASE WHEN mediaType = 'Series' AND status = 'Planned' THEN 1 ELSE 0 END) AS totalSeriesPlanned,
  SUM(CASE WHEN mediaType = 'Movie' AND status = 'Planned' THEN 1 ELSE 0 END) AS totalMoviesPlanned,
  SUM(CASE WHEN mediaType = 'Graphic Novels' AND status = 'Planned' THEN 1 ELSE 0 END) AS totalGraphicNovelsPlanned,
  SUM(CASE WHEN mediaType = 'Book' AND status = 'Planned' THEN 1 ELSE 0 END) AS totalBookPlanned,

  SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) AS totalMediaOnHold,
  SUM(CASE WHEN mediaType = 'Series' AND status = 'On Hold' THEN 1 ELSE 0 END) AS totalSeriesOnHold,
  SUM(CASE WHEN mediaType = 'Movie' AND status = 'On Hold' THEN 1 ELSE 0 END) AS totalMoviesOnHold,
  SUM(CASE WHEN mediaType = 'Graphic Novels' AND status = 'On Hold' THEN 1 ELSE 0 END) AS totalGraphicNovelsOnHold,
  SUM(CASE WHEN mediaType = 'Book' AND status = 'On Hold' THEN 1 ELSE 0 END) AS totalBookOnHold
  FROM media m
  `;
  return new Promise((resolve, reject) => {
    db.get(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
}

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
    stats: await getStats(),
    completed: await getCompleted(),
    inprogress: await getInprogress(),
    planned: await getPlanned(),
    notes: await getNotes()
  };
};
