const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/whatsnext.db');

/**
 * Function to run additional setup scripts for the database.
 * @function
 */
runScripts = () => {};

/**
 * Sets up the database schema by creating necessary tables if they do not exist.
 * @function
 * @returns {void}
 */
exports.setupDb = () =>
  db.serialize(() => {
    db.run(
      `
			CREATE TABLE IF NOT EXISTS media(
				id INTEGER PRIMARY KEY,
				title STRING NOT NULL,
				subTitle STRING,
				mediaType STRING NOT NULL,
				extID INTEGER,
				score DOUBLE,
				status STRING NOT NULL,
				storage STRING,
				releaseDate STRING,
				dateCreated DATE NOT NULL,
				dateLastUpdated DATE,
				img STRING,
				creator STRING,
				summary STRING
			)
		`
    );

    db.run(`
		CREATE TABLE IF NOT EXISTS progress(
			id INTEGER PRIMARY KEY,
			title STRING NOT NULL DEFAULT 'First Watch',
			current STRING,
			total STRING,
			unit STRING,
			dateStarted DATE,
			dateCompleted DATE,
			mediaID INTEGER NOT NULL,
			FOREIGN KEY (mediaID) REFERENCES media(id)
		)
		`);

    db.run(
      `
			CREATE TABLE IF NOT EXISTS notes(
				id INTEGER PRIMARY KEY,
				title STRING NOT NULL,
				content STRING NOT NULL,
				dateCreated DATE NOT NULL,
				dateLastUpdated DATE,
				mediaID INTEGER NOT NULL,
				FOREIGN KEY (mediaID) REFERENCES media(id)
			)
			`
    );

    runScripts();
  });
