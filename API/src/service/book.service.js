const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./watchnext.db');
const gbookFinder = require('@chewhx/google-books');
const puppeteer = require('puppeteer');

const getBookImageLink = async isbn => {
  const TIMEOUT = 1000;
  const MAX_RETRIES = 5;
  let retryCount = 0;

  const delay = time => {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  };

  const findImage = async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    );
    await delay(TIMEOUT);

    await page.goto('https://www.amazon.com', {
      waitUntil: 'domcontentloaded'
    });

    await page.setViewport({ width: 1860, height: 1400 });

    await delay(TIMEOUT);
    await page.waitForSelector('#twotabsearchtextbox', {
      visible: true,
      timeout: 2000
    });
    await page.type('#twotabsearchtextbox', isbn);
    await page.keyboard.press('Enter');

    await delay(TIMEOUT);

    await page.waitForSelector('.s-image', { visible: true, timeout: TIMEOUT });

    const searchResult = await page.$('.s-image');
    await searchResult.click();

    await delay(TIMEOUT);

    await page.waitForSelector('.a-dynamic-image', {
      visible: true,
      timeout: TIMEOUT
    });
    const landingImg = await page.$('.a-dynamic-image');
    await landingImg.click();

    await delay(6000);

    const imageLink = await page.$eval('.fullscreen', img => img.src);

    await browser.close();

    return imageLink;
  };

  const retry = async () => {
    try {
      const imageLink = await findImage();
      return imageLink;
    } catch (error) {
      console.error('Function failed:', error);
      retryCount++;
      if (retryCount <= MAX_RETRIES) {
        console.log('Retrying...');
        await delay(TIMEOUT);
        return retry();
      } else {
        throw new Error('Exceeded maximum retry attempts');
      }
    }
  };

  return retry();
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
    const gBooks = book.isbn
      ? await gbookFinder.isbn(book.title, { isbn: book.isbn })
      : await gbookFinder.search(book.title);

    book = populateBook(gBooks.items, {
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
        await getBookImageLink(isbn), //getBookImageLink(isbn),
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
    WHERE id = ?
    `,
      [
        book.readingStatus,
        book.personalRating,
        book.dateStarted,
        book.dateCompleted,
        book.ownershipStatus,
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
