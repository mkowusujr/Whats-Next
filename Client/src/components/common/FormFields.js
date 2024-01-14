/**
 * Different status options for media items.
 * @type {Array}
 */
export const statuses = [
  { label: 'Status', value: '' },
  { label: 'Planned', value: 'Planned' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Dropped', value: 'Dropped' }
];

/**
 * Different score options for media items.
 * @type {Array}
 */
export const scores = [
  { label: 'Score', value: 0 },
  { label: '(10) Masterpiece', value: 10 },
  { label: '(9) Great', value: 9 },
  { label: '(8) Very Good', value: 8 },
  { label: '(7) Good', value: 7 },
  { label: '(6) Fine', value: 6 },
  { label: '(5) Average', value: 5 },
  { label: '(4) Bad', value: 4 },
  { label: '(3) Very Bad', value: 3 },
  { label: '(2) Horrible', value: 2 },
  { label: '(1) Appalling', value: 1 }
];

/**
 * Different storage types for media items.
 * @type {Array}
 */
export const storageTypes = [
  { label: 'Storage', value: '' },
  { label: 'Not Owned', value: 'not owned' },
  { label: 'Physically Owned', value: 'physically owned' },
  { label: 'Renting/Borrowing', value: 'renting/borrowing' },
  { label: 'Digitally Owned', value: 'digitally owned' },
  { label: 'On Streaming', value: 'on streaming' }
];

/**
 * Different progress unit options for books.
 * @type {Array}
 */
export const bookProgressUnits = [
  { label: 'Units', value: '' },
  { label: 'Pages', value: 'Pages' },
  { label: 'Chapters', value: 'Chapters' },
  { label: 'Issues', value: 'Issues' }
];

/**
 * Different progress unit options for other media types.
 * @type {Array}
 */
export const mediaProgressUnits = [
  { label: 'Units', value: '' },
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Episodes', value: 'Episodes' }
];

/**
 * Different video media types.
 * @type {Array}
 */
export const videoMediaTypes = [
  { label: 'Movie', value: 'Movie' },
  { label: 'Series', value: 'Series' }
];

/**
 * Different book types.
 * @type {Array}
 */
export const bookTypes = [
  { label: 'Graphic Novels', value: 'Graphic Novels' },
  { label: 'Fiction', value: 'Fiction' }
];

/**
 * Sorting options for media items.
 * @type {Array}
 */
export const sortByOptions = [
  {
    label: 'Name',
    value: 'Name',
    sortBy: (a, b) => {
      return a.name < b.name
        ? -1
        : a.title + (a.subTitle ?? '') > b.title + (b.subTitle ?? '')
        ? 1
        : 0;
    },
    findNullProps: m => {
      return m.name == '';
    }
  },
  {
    label: 'Score',
    value: 'Score',
    sortBy: (a, b) => {
      return a.score - b.score;
    },
    findNullProps: m => {
      return m.personalRating == 'Select Personal Rating';
    }
  },
  {
    label: 'Date Started',
    value: 'Date Started',
    sortBy: (a, b) => {
      return new Date(a.dateStarted ?? a.dS) - new Date(b.dateStarted ?? b.dS);
    },
    findNullProps: m => {
      return m.dateStarted ? m.dateStarted == '' : m.dS == '';
    }
  },
  {
    label: 'Date Completed',
    value: 'Date Completed',
    sortBy: (a, b) => {
      return (
        new Date(a.dateCompleted ?? a.dC) - new Date(b.dateCompleted ?? b.dC)
      );
    },
    findNullProps: m => {
      return m.dateCompleted ? m.dateCompleted == '' : m.dC == '';
    }
  }
];

/**
 * Darkens a color.
 * @param {string} color - The color to be darkened.
 * @returns {string} - The darkened color.
 */
const darkenColor = color => {
  // Parse the color string to extract RGB values
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken the color by reducing the brightness
  const factor = 0.5; // Adjust this factor to control darkness
  const darkenedR = Math.floor(r * factor);
  const darkenedG = Math.floor(g * factor);
  const darkenedB = Math.floor(b * factor);

  // Convert the darkened RGB values back to hex
  const darkenedHex = `#${darkenedR.toString(16)}${darkenedG.toString(
    16
  )}${darkenedB.toString(16)}`;

  return darkenedHex;
};

/**
 * Color options for personal ratings.
 * @type {Object}
 */
export const pRatingColors = {
  one: {
    background: '#ff4d4d',
    font: darkenColor('#ff4d4d')
  },
  two: {
    background: '#ff4d4d',
    font: darkenColor('#ff4d4d')
  },
  three: {
    background: '#ff4d4d',
    font: darkenColor('#ff4d4d')
  },
  four: {
    background: '#ff4d4d',
    font: darkenColor('#ff4d4d')
  },
  five: {
    background: '#ff4d4d',
    font: darkenColor('#ff4d4d')
  },
  six: {
    background: '#fb7b3f',
    font: darkenColor('#fb7b3f')
  },
  seven: {
    background: '#f8b032',
    font: darkenColor('#f8b032')
  },
  eight: {
    background: '#f4eb25',
    font: darkenColor('#f4eb25')
  },
  nine: {
    background: '#b6f118',
    font: darkenColor('#b6f118')
  },
  ten: {
    background: '#68ed0c',
    font: darkenColor('#68ed0c')
  }
};
