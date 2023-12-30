const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');
const gbookFinder = require('@chewhx/google-books');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const toBase64Str = async url => {
  const r = await fetch(url);
  const imgBuffer = await r.buffer();
  const base64String = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
  return base64String;
};

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

exports.add = async book => {
  return new Promise(async (resolve, reject) => {
    try {
      let gBooks = book.isbn
        ? await gbookFinder.isbn(book.title, { isbn: book.isbn })
        : await gbookFinder.search(book.title);

      gBooks = gBooks.items;

      const r1 = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${gBooks[0].id}`
      );
      const f1 = await r1.json();
      let coverImg = f1.volumeInfo.imageLinks.extraLarge;
      if (coverImg) {
        coverImg = await toBase64Str(coverImg);
      }

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
        imageLinks: null,
        coverImgX: null,
        coverImgL: null,
        coverImgM: null
      });

      let isbn = null;
      if (book.industryIdentifiers) {
        isbn = book.industryIdentifiers
          .map(identifierObj => Object.entries(identifierObj))
          .find(identifier => identifier[0][1] === 'ISBN_13')[1][1];
      }

      db.run(
        `
      INSERT INTO books(
        title,
        subtitle,
        description,
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          book.title,
          book.subtitle,
          book.description,
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
        async function (err) {
          if (err) {
            reject(err);
          } else {
            const bookID = this.lastID;
            await saveImg(coverImg ?? book.imageLinks.thumbnail, bookID);
            db.get(
              `select * from books where id = ?`,
              bookID,
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
  deleteCoverImage(bookID);
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

saveImg = async (imageUrl, bookID) => {
  const path = require('path');

  const base64ToImageAndSave = (base64String, filePath) => {
    const fs = require('fs');
    base64String = base64String.replace('data:image/jpeg;base64,', '');
    // Step 1: Convert Base64 to Buffer
    const buffer = Buffer.from(base64String, 'base64');

    // Step 2: Save Buffer to File
    fs.writeFileSync(filePath, buffer, err => {
      if (err) {
        console.error('Error saving image:', err);
      } else {
        console.log('Image saved successfully:', filePath);
      }
    });
  };

  const res = await fetch(imageUrl);
  const imgBuffer = await res.buffer();
  const base64String = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
  const loc = path.join(__dirname, `../../data/images/books/${bookID}.jpg`);
  base64ToImageAndSave(base64String, loc);
};

deleteCoverImage = bookID => {
  const fs = require('fs');
  const path = require('path');

  function deleteFilesMatchingString(directoryPath, searchString) {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      files.forEach(file => {
        if (file.includes(searchString)) {
          const filePath = path.join(directoryPath, file);
          fs.unlink(filePath, err => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('File deleted:', filePath);
          });
        }
      });
    });
  }

  const directoryPath = path.join(__dirname, '../../data/images/books');
  const searchString = `${bookID}.jpg`;

  deleteFilesMatchingString(directoryPath, searchString);
};
