
/**
 * Different status options for media items.
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

export const externalMediaTypes = [
  { label: "Movie/Show", value: "Movie/Show" },
  { label: "Book", value: "Book" }
]

/**
 * Different storage types for media items.
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
 */
export const bookProgressUnits = [
  { label: 'Units', value: '' },
  { label: 'Pages', value: 'Pages' },
  { label: 'Chapters', value: 'Chapters' },
  { label: 'Issues', value: 'Issues' }
];

/**
 * Different progress unit options for other media types.
 */
export const mediaProgressUnits = [
  { label: 'Units', value: '' },
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Episodes', value: 'Episodes' }
];

/**
 * Different video media types.
 */
export const videoMediaTypes = [
  { label: 'Movie', value: 'Movie' },
  { label: 'Series', value: 'Series' }
];

/**
 * Different book types.
 */
export const bookTypes = [
  { label: 'Graphic Novels', value: 'Graphic Novels' },
  { label: 'Book', value: 'Book' }
];
