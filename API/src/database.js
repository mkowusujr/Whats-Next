const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('watchnext.db');

runScripts = () => {

};

exports.setupDb = () =>
  db.serialize(() => {
    db.run(
      `
			CREATE TABLE IF NOT EXISTS media(
				id INTEGER PRIMARY KEY,
				name STRING NOT NULL,
				watchStatus STRING NOT NULL,
				personalRating DOUBLE,
				dateStarted DATE,
				dateCompleted DATE,
				posterImageUrl STRING NOT NULL,
				releaseDate STRING NOT NULL,
				mediaType STRING NOT NULL,
				genres STRING NOT NULL,
				directors STRING NOT NULL,
				writers STRING NOT NULL,
				imdbRating STRING NOT NULL,
				plot STRING NOT NULL,
				cast STRING NOT NULL,
				runtime STRING NOT NULL,
				dateAdded DATE NOT NULL,
				lastUpdated DATE,
				ownershipStatus STRING,
        progressID INTEGER,
  			FOREIGN KEY(progressID) REFERENCES progress(id)
			)
		`
    );

    db.run(`
		CREATE TABLE IF NOT EXISTS books(
			id INTEGER PRIMARY KEY,
			title STRING NOT NULL,
			description STRING,
			imageUrl STRING,
			authors STRING,
			publisher STRING,
			publishedDate STRING,
			pageCount INTEGER,
			categories STRING,
			readingStatus STRING NOT NULL,
			personalRating DOUBLE,
			dateStarted DATE,
			dateCompleted DATE,
			isbn INTEGER,
			ownershipStatus STRING,
      progressID INTEGER,
  			FOREIGN KEY(progressID) REFERENCES progress(id)
		)
		`);

    db.run(`
		CREATE TABLE IF NOT EXISTS progress(
			id INTEGER PRIMARY KEY,
			current STRING,
			total STRING,
			unit STRING
		)
		`);

    db.run(
      `
			CREATE TABLE IF NOT EXISTS notes(
				id INTEGER PRIMARY KEY,
				title STRING NOT NULL,
				content STRING NOT NULL,
				mediaID INTEGER NOT NULL,
				bookID INTEGER NOT NULL,
				dateAdded DATE NOT NULL,
				lastUpdated DATE,
				FOREIGN KEY (mediaID) REFERENCES media(id)
			)
			`
    );

    runScripts();
  });
