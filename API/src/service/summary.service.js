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

const fixDateTZ = date => `${date} 00:00:00`;

exports.getSummary = async () => {
  let mediaList = await mediaService.list();
  bookList = []; //await bookService.list();

  mediaList = mediaList.map(m => {
    return {
      id: `${m.id}m`,
      n: m.name,
      dS: m.dateStarted ? fixDateTZ(m.dateStarted) : '',
      dC: m.dateCompleted ? fixDateTZ(m.dateCompleted) : '',
      t: m.mediaType,
      i: m.posterImageUrl,
      s: m.watchStatus,
      r: m.personalRating,
      c: 'watchnext',
      d: m.runtime,
      p: m.progressID
    };
  });

  const imgsUrl = 'http://localhost:3000/imgs/books';

  bookList = bookList.map(b => {
    return {
      id: `${b.id}b`,
      n: `${b.title}${b.subtitle ? `: ${b.subtitle}` : ''}`,
      dS: b.dateStarted ? fixDateTZ(b.dateStarted) : '',
      dC: b.dateCompleted ? fixDateTZ(b.dateCompleted) : '',
      t: JSON.parse(b.categories),
      i: `${imgsUrl}/${b.id}`,
      s: b.readingStatus,
      r: b.personalRating,
      c: 'readnext',
      d: b.pageCount,
      p: b.progressID
    };
  });

  return {
    completed: [
      ...mediaList.filter(m => m.s == 'Watched'),
      ...bookList.filter(b => b.s == 'Completed')
    ],
    inprogress: [
      ...mediaList.filter(m => m.s == 'Watching'),
      ...bookList.filter(b => b.s == 'Reading')
    ],
    planned: [
      ...mediaList.filter(m => m.s == 'Planned'),
      ...bookList.filter(b => b.s == 'Planned')
    ],
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
