const bookService = require('./book.service');
const mediaService = require('./media.service');

const pRatingToNum = pRating => {
  const endIndex = pRating.indexOf(')');
  return +pRating.substring(1, endIndex);
};

const sortByPRating = (a, b) => pRatingToNum(a.r) - pRatingToNum(b.r);

const findNullPRating = m => m.r == 'Select Personal Rating';

const dateCheck = (from, to, check) => {
  let fDate, tDate, cDate;
  fDate = Date.parse(from);
  tDate = Date.parse(to);
  cDate = Date.parse(check);

  if (cDate <= tDate && cDate >= fDate) {
    return true;
  }
  return false;
};

exports.getSummary = async () => {
  let mediaList = await mediaService.list();
  bookList = await bookService.list();

  mediaList = mediaList.map(m => {
    return {
      id: m.id,
      n: m.name,
      dS: m.dateStarted,
      dC: m.dateCompleted,
      t: m.mediaType,
      i: m.posterImageUrl,
      s: m.watchStatus,
      r: m.personalRating,
      c: 'watchnext',
      d: m.runtime
    };
  });

  bookList = bookList.map(b => {
    return {
      id: b.id,
      n: `${b.title}${b.subtitle ? `: ${b.subtitle}` : ''}`,
      dS: b.dateStarted,
      dC: b.dateCompleted,
      t: JSON.parse(b.categories),
      i: b.imageUrl,
      s: b.readingStatus,
      r: b.personalRating,
      c: 'readnext',
      d: b.pageCount
    };
  });

  return {
    completed: {
      media: mediaList.filter(m => m.s == 'Watched'),
      books: bookList.filter(b => b.s == 'Completed')
    },
    inprogress: {
      media: mediaList.filter(m => m.s == 'Watching'),
      books: bookList.filter(b => b.s == 'Reading')
    },
    topRated: {
      media: mediaList
        .filter(m => !findNullPRating(m))
        .sort(sortByPRating)
        .slice(0, 10),
      books: bookList
        .filter(b => !findNullPRating(b))
        .sort(sortByPRating)
        .slice(0, 10)
    }
  };
};
