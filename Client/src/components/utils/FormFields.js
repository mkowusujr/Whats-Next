export const watchStatuses = ['Watched', 'Watching', 'Planned'];

export const mediaTypes = ['Movie', 'Series'];
export const bookTypes = ['Comics & Graphic Novels'];
export const ratings = [
  'Select Personal Rating',
  '(10) Masterpiece',
  '(9) Great',
  '(8) Very Good',
  '(7) Good',
  '(6) Fine',
  '(5) Average',
  '(4) Bad',
  '(3) Very Bad',
  '(2) Horrible',
  '(1) Appalling'
];

export const pRatingToNum = pRating => {
  const endIndex = pRating.indexOf(')');
  return +pRating.substring(1, endIndex);
};

const extractNumber = title => {
  const numberMatch = title.match(/\d+/);
  return numberMatch ? parseInt(numberMatch[0], 10) : Number.MAX_VALUE;
};

export const sortByOptions = {
  pRating: {
    label: 'Personal Rating',
    sortBy: (a, b) => {
      return pRatingToNum(a.personalRating) - pRatingToNum(b.personalRating);
    },
    findNullProps: m => {
      return m.personalRating == 'Select Personal Rating';
    }
  },
  name: {
    label: 'Name',
    sortBy: (a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    },
    findNullProps: m => {
      return m.name == '';
    }
  },
  title: {
    label: 'Title',
    sortBy: (a, b) => {
      const aNumber = extractNumber(a.title);
      const bNumber = extractNumber(b.title);

      const aTitle = a.title.replace(/\d+/, '').trim();
      const bTitle = b.title.replace(/\d+/, '').trim();

      if (aTitle !== bTitle) {
        return aTitle.localeCompare(bTitle);
      }

      return aNumber - bNumber;
    },
    findNullProps: m => {
      return m.title == '';
    }
  },
  releaseDate: {
    label: 'Release Date',
    sortBy: (a, b) => {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    },
    findNullProps: m => {
      return m.releaseDate == '';
    }
  },
  dStarted: {
    label: 'Date Started',
    sortBy: (a, b) => {
      return new Date(a.dateStarted ?? a.dS) - new Date(b.dateStarted ?? b.dS);
    },
    findNullProps: m => {
      return m.dateStarted ? m.dateStarted == '' : m.dS == '';
    }
  },
  dCompleted: {
    label: 'Date Completed',
    sortBy: (a, b) => {
      return (
        new Date(a.dateCompleted ?? a.dC) - new Date(b.dateCompleted ?? b.dC)
      );
    },
    findNullProps: m => {
      return m.dateCompleted ? m.dateCompleted == '' : m.dC == '';
    }
  }
};

export const ownershipOptions = [
  'not owned',
  'physically owned',
  'renting/borrowing',
  'digitally owned',
  'on streaming'
];

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

function darkenColor(color) {
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
}

export const readingStatuses = [
  'Select Reading Status',
  'Planned',
  'Reading',
  'Paused',
  'Dropped',
  'Completed'
];
