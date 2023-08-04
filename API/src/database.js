const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('watchnext.db');

runScripts = () => {
  /*
	 db.run(`
   ALTER TABLE media
   ADD COLUMN ownershipStatus TEXT;
   `);
	*/
  /*
	db.run(`alter table books add column readingStatus STRING NOT NULL`)
  db.run(`alter table books add column personalRating DOUBLE`);
  db.run(`alter table books add column dateStarted DATE`);
  db.run(`alter table books add column dateCompleted DATE`);
  db.run(`alter table books add column isbn INTEGER`);
	db.run(`alter table books add column ownershipStatus STRING`);
	*/
  /*
	db.run(`alter table notes add column bookID INTEGER`);
	db.run(`ALTER TABLE books
  RENAME COLUMN publisedDate TO publishedDate;`);
	*/
  /*
	db.run('drop table books')
  db.run(`alter table books add column subtitle STRING`);
	*/
  /*
	const fetch = require('node-fetch');

  const imgs = db.all(
    `select id, imageUrl from books where imageUrl LIKE '%http://books.google.com%'`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
      }
      rows.forEach(async i => {
        const r = await fetch(i.imageUrl);
        const imgBuffer = await r.buffer();
        const base64String = `data:image/jpeg;base64,${imgBuffer.toString(
          'base64'
        )}`;
				db.run(`Update books set imageUrl = ? where id=?`,[base64String, i.id]);
        
      });
    }
  );
	*/
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
				lastUpdated DATE
			)
		`
    );

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
			ownershipStatus STRING
		)
		`);

    runScripts();
  });
