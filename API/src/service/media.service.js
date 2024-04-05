const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_URL);
const movier = require('movier');
const gbookFinder = require('@chewhx/google-books');
const fetch = require('node-fetch');

/**
 * Adds a new media entry to the database.
 * @param {Object} media - The media object containing information to be added.
 * @param {string} media.title - The title of the media.
 * @param {string} media.subTitle - The subtitle of the media (optional).
 * @param {string} media.mediaType - The type of media (e.g., Movie, Series, Graphic Novels, Book).
 * @param {number} media.score - The score of the media.
 * @param {string} media.status - The status of the media.
 * @param {string} media.link - The link to access the media.
 * @returns {Promise<Object>} A promise that resolves with the added media object.
 * @throws {Error} Throws an error if there is an issue with the creation process.
 */
exports.add = async media => {
  // const mediaInfo = await fetchInfo(media);

  return new Promise(async (resolve, reject) => {
    // const titleCase = name => {
    //   return name.charAt(0).toUpperCase() + name.slice(1);
    // };

    const insertStmt = `
    INSERT INTO media(
      title,
      subTitle,
      mediaType,
      score,
      status,
      dateCreated,
      dateLastUpdated,
      img,
      creator,
      summary,
      releaseDate,
      link
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertData = [
      media.title,
      media.subTitle,
      media.mediaType,
      media.score,
      "Planned",
      new Date().toLocaleDateString(),
      new Date().toLocaleDateString(),
      media.img,
      media.creator,
      media.summary,
      media.releaseDate,
      media.link
    ];

    db.run(insertStmt, insertData, function (err) {
      if (err) {
        reject(err);
      } else {
        db.get(
          `select * from media where id = ?`,
          this.lastID,
          function (err, row) {
            resolve(row);
          }
        );
      }
    });
  });
};

/**
 * Retrieves a list of media entries from the database based on media types.
 * @param {Array<string>} mediaTypes - An array of media types to filter the result.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing the retrieved
 * media objects.
 * @throws {Error} Throws an error if there is an issue with the select process.
 */
exports.list = mediaTypes => {
  const selectStmt = `SELECT * FROM media WHERE mediaType IN ('${mediaTypes.join(
    "','"
  )}')
  AND (isDeleted = 0 OR isDeleted is Null)
  `;

  return new Promise((resolve, reject) => {
    db.all(selectStmt, (err, rows) => (_ = err ? reject(err) : resolve(rows)));
  });
};

/**
 * Retrieves additional information for a media entry using external sources.
 * @param {Object} media - The media object for which additional information is needed.
 * @returns {Promise<Object>} A promise that resolves with additional information for the media entry.
 * @throws {Error} Throws an error if there is an issue with the fetch process.
 */
const fetchInfo = async media => {
  const mediaTitle = media.title + (media.subTitle ?? '');

  let mediaInfo = {};
  switch (media.mediaType) {
    case 'Movie':
    case 'Series':
      const imdbInfo = await movier.getTitleDetailsByName(mediaTitle);
      mediaInfo = {
        img: imdbInfo.posterImage.url,
        creator: imdbInfo.directors[0]?.name ?? null,
        summary: imdbInfo.plot,
        releaseDate: new Date(imdbInfo.dates.startDate)
          .toISOString()
          .split('T')[0]
      };

      return mediaInfo;
    case 'Graphic Novels':
    case 'Book':
      try {
        const gBooks = await gbookFinder.search({ q: mediaTitle });
        const gBook = gBooks.items[0].volumeInfo;
        const r1 = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${gBooks.items[0].id}`
        );
        const f1 = await r1.json();

        let coverImg = f1.volumeInfo.imageLinks.medium;

        mediaInfo = {
          img:
            coverImg ??
            'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
          creator: gBook.authors ? gBook.authors.join(',') : '',
          summary: gBook.description,
          releaseDate: gBook.publishedDate
        };

        return mediaInfo;
      } catch (err) {
        console.log(err.message);
      }
  }
};

/**
 * Retrieves information for a media entry from the database based on media ID.
 * @param {number} mediaID - The ID of the media entry to retrieve information.
 * @returns {Promise<Object>} A promise that resolves with information for the specified media entry.
 * @throws {Error} Throws an error if there is an issue with the select process.
 */
exports.getInfo = mediaID => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT * FROM media WHERE id = ?`,
      mediaID,
      async function (err, row) {
        _ = err ? reject(err) : resolve(row);
      }
    );
  });
};

/**
 * Updates a media entry in the database.
 * @param {Object} media - The media object containing updated information.
 * @param {string} media.title - The updated title of the media.
 * @param {string} media.subTitle - The updated subtitle of the media.
 * @param {string} media.status - The updated status of the media.
 * @param {number} media.score - The updated score of the media.
 * @param {string} media.storage - The updated storage information for the media.
 * @param {string} media.releaseDate - The updated release date of the media.
 * @param {string} media.link - The link to access the media.
 * @param {string} media.img - The image source to access the media.
 * @param {number} media.id - The ID of the media entry to update.
 * @returns {Promise<Object>} A promise that resolves with the updated media object.
 * @throws {Error} Throws an error if there is an issue with the update process.
 */
exports.update = media => {
  const updateStmt = `
    UPDATE media
    SET
    title = ?,
    subTitle = ?,
    status = ?,
    score = ?, 
    storage = ?,
    releaseDate = ?,
    dateLastUpdated = ?,
    link = ?,
    img = ?,
    summary = ?
    WHERE id = ?
    `;

  let updateData = [
    media.title,
    media.subTitle,
    media.status,
    media.score,
    media.storage,
    media.releaseDate,
    new Date().toLocaleDateString(),
    media.link,
    media.img,
    media.summary,
    media.id
  ];

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(updateStmt, updateData, function (err) {
        if (err) {
          reject(err);
        }
      });
      db.get(`select * from media where id = ?`, media.id, function (_, row) {
        resolve(row);
      });
    });
  });
};

/**
 * Deletes a media entry from the database based on media ID.
 * @param {number} mediaID - The ID of the media entry to delete.
 * @returns {Promise<string>} A promise that resolves with a success message upon successful deletion.
 * @throws {Error} Throws an error if there is an issue with the deletion process.
 */
exports.delete = mediaID => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE media SET isDeleted = true WHERE id = ?
    `,
      mediaID,
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

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
// const stringSimilarity = require('string-similarity');

exports.searchGbooks = async (query, mediaType) => {
  switch (mediaType) {
    case 'Books':
      try {
        const gBooks = await gbookFinder.search({ q: query });
        const links = gBooks.items.map(b => b.selfLink);

        const fetchPromises = links.map(l => {
          return fetch(l)
            .then(response => response.json())
            .then(data => {
              const bookInfo = data.volumeInfo;
              const book = {
                similarity: stringSimilarity.compareTwoStrings(
                  query,
                  bookInfo.title
                ),
                title: bookInfo.title.split(':')[0],
                subTitle: bookInfo.title.split(':')[1],
                creator: bookInfo.authors,
                releaseDate: bookInfo.publishedDate,
                summary: bookInfo.description,
                industryIdentifiers: bookInfo.industryIdentifiers,
                duration: bookInfo.printedPageCount,
                img:
                  bookInfo.imageLinks.large ??
                  bookInfo.imageLinks.medium ??
                  bookInfo.imageLinks.small ??
                  null
              };
              return book;
            });
        });

        const detailedGbooks = await Promise.all(fetchPromises);
        return detailedGbooks
          .sort((a, b) => a.similarity - b.similarity)
          .reverse();
      } catch (err) {
        console.error(err);
      }
      break;
    case 'Movies/Shows':
      try {
        const imdbInfo = await movier.searchTitleByName(query);
        const imdbIds = imdbInfo.slice(0, 5).map(i => i.source.sourceId);

        const fetchPromises = imdbIds.map(id => {
          return movier.getTitleDetailsByIMDBId(id).then(d => {
            const item = {
              similarity: stringSimilarity.compareTwoStrings(query, d.name),
              title: d.name.split(':')[0],
              subTitle: d.name.split(':')[1],
              creator: d.directors[0].name,
              releaseDate: d.allReleaseDates.find(
                date => date.country === 'United States'
              ).date,
              summary: d.plot,
              duration: d.runtime.title,
              img: d.posterImage.url ?? null
            };

            return item;
          });
        });
        const result = await Promise.all(fetchPromises);
        return result.sort((a, b) => a.similarity - b.similarity).reverse();
      } catch (err) {
        console.log(err);
      }
  }
};
