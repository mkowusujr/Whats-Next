const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('whatsnext.db');
const oldDB = new sqlite3.Database('watchnext.db');

runScripts = () => {

};

exports.setupDb = () =>
  db.serialize(() => {
    db.run(
      `
			CREATE TABLE IF NOT EXISTS media(
				id INTEGER PRIMARY KEY,
				title STRING NOT NULL,
				subTitle STRING NOT NULL,
				mediaType STRING NOT NULL,
				extID INTEGER,
				score DOUBLE,
				status STRING NOT NULL,
				storage STRING, 
				releaseDate STRING NOT NULL,
				dateCreated DATE NOT NULL,
				dateLastUpdated DATE
			)
		`
    );

    db.run(`
		CREATE TABLE IF NOT EXISTS progress(
			id INTEGER PRIMARY KEY,
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
