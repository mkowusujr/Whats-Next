const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');
const gbookFinder = require('@chewhx/google-books');
const puppeteer = require('puppeteer');

const populateBook = (gBooks, book) => {
  for (const gBook of gBooks) {
    Object.entries(gBook.volumeInfo).forEach(([key, value]) => {
      if (
        key === 'title' &&
        book.title.split(' ').includes(value.split(' ')[0])
      ) {
        book[key] == value;
      }

      if (book[key] === null) {
        if (
          key === 'categories' &&
          value[0].includes('Fictitious characters')
        ) {
          book[key] == null;
        } else if (
          key === 'subtitle' &&
          book.title.split(' ').includes(value.split(' ')[0])
        ) {
          book[key] == null;
        } else {
          book[key] = value;
        }
      }
    });

    if (Object.values(book).every(value => value !== null)) {
      break;
    }
  }

  return book;
};

const findNumberInString = inputString => {
  const words = inputString.split(' ');

  let foundNumber = '';

  for (const word of words) {
    const num = Number(word);

    if (!isNaN(num) && isFinite(num)) {
      foundNumber = num;
      break;
    }
  }

  return foundNumber;
};

exports.add = async book => {
  return new Promise(async (resolve, reject) => {
    try {
      let gBooks = book.isbn
        ? await gbookFinder.isbn(book.title, { isbn: book.isbn })
        : await gbookFinder.search(book.title);

      gBooks = gBooks.items.filter(gBk =>
        gBk.volumeInfo.title.includes(findNumberInString(book.title))
      );

      book = populateBook(gBooks, {
        ...book,
        description: null,
        authors: null,
        publisher: null,
        publishedDate: null,
        pageCount: null,
        categories: null,
        industryIdentifiers: null,
        subtitle: null,
        imageLinks: null
      });

      let isbn = book.industryIdentifiers
        .map(identifierObj => Object.entries(identifierObj))
        .find(identifier => identifier[0][1] === 'ISBN_13')[1][1];

      db.run(
        `
      INSERT INTO books(
        title,
        subtitle,
        description,
        imageUrl,
        authors,
        publisher,
        publishedDate,
        pageCount,
        categories,
        readingStatus,
        personalRating,
        dateStarted,
        dateCompleted,
        isbn
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          book.title,
          book.subtitle,
          book.description,
          book.imageLinks.thumbnail,
          `${JSON.stringify(book.authors)}`,
          book.publisher,
          book.publishedDate,
          book.pageCount,
          `${JSON.stringify(book.categories)}`,
          book.readingStatus,
          book.personalRating,
          book.dateStarted,
          book.dateCompleted,
          isbn
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
    } catch (err) {
      reject(err);
    }
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
    ownershipStatus = ?,
    imageUrl = ?,
    title = ?,
    subtitle = ?
    WHERE id = ?
    `,
      [
        book.readingStatus,
        book.personalRating,
        book.dateStarted,
        book.dateCompleted,
        book.ownershipStatus,
        book.imageUrl,
        book.title,
        book.subtitle,
        book.id
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
