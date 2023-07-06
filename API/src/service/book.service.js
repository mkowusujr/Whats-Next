const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');
const isbn = require('node-isbn');

exports.add = async book => {
  return new Promise(async (resolve, reject) => {
    const isbnInfo = await isbn.resolve(book.isbn);

    if (!isbnInfo.imageLinks) {
      isbnInfo.imageLinks = { thumbnail :null};
    }
    db.run(
      `
		INSERT INTO books(
			title,
			description,
			imageUrl,
			authors,
			publisher,
			publisedDate,
			pageCount,
			categories,
			rating,
			previewLink,
			volLink,
			readingStatus,
			personalRating,
			dateStarted,
			dateCompleted,
			isbn
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`,
      [
        isbnInfo.title,
        isbnInfo.description,
        isbnInfo.imageLinks.thumbnail,
        `${JSON.stringify(isbnInfo.authors)}`,
        isbnInfo.publisher,
        isbnInfo.publishedDate,
        isbnInfo.pageCount,
        `${JSON.stringify(isbnInfo.categories)}`,
        isbnInfo.averageRating,
        isbnInfo.previewLink,
        isbnInfo.infoLink,
        book.readingStatus,
        book.personalRating,
        book.dateStarted,
        book.dateCompleted,
        book.isbn
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from books where id = ?`,
            this.lastID,
            function (err, row) {
              resolve(row);
            }
          );
        }
      }
    );
  });
};

exports.list = async () => {
  return new Promise(async (resolve, reject) => {
    db.all(`SELECT * FROM books`, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.update = async book => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
    UPDATE books
    SET readingStatus = ?,
    personalRating = ?, 
    dateStarted = ?, 
    dateCompleted = ?,
    ownershipStatus = ?
    `,
      [
        book.readingStatus,
        book.personalRating,
        book.dateStarted,
        book.dateCompleted,
        book.ownershipStatus
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `select * from books where id = ?`,
            book.id,
            function (err, row) {
              resolve(row);
            }
          );
        }
      }
    );
  });
};

exports.delete = bookID => {
  return new Promise(async (resolve, reject) => {
    db.run(
      `
    DELETE FROM books
    WHERE id = ?
    `,
      bookID,
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
