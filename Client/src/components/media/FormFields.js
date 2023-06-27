export const watchStatuses = ["Watched", "Watching", "Planned"];

export const mediaTypes = ["Movie", "Series"];

export const ratings = [
  "Select Personal Rating",
  "(10) Masterpiece",
  "(9) Great",
  "(8) Very Good",
  "(7) Good",
  "(6) Fine",
  "(5) Average",
  "(4) Bad",
  "(3) Very Bad",
  "(2) Horrible",
  "(1) Appalling",
];

const pRatingToNum = (pRating) => {
  const endIndex = pRating.indexOf(")");
  return +pRating.substring(1, endIndex);
};

export const sortByOptions = {
  pRating: {
    label: "Personal Rating",
    sortBy: (a, b) => {
      return pRatingToNum(a.personalRating) - pRatingToNum(b.personalRating);
    },
    findNullProps: (m) => {
      return m.personalRating == "Select Personal Rating";
    },
  },
  name: {
    label: "Name",
    sortBy: (a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    },
    findNullProps: (m) => {
      return m.name == "";
    },
  },
  releaseDate: {
    label: "Release Date",
    sortBy: (a, b) => {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    },
    findNullProps: (m) => {
      return m.releaseDate == "";
    },
  },
  dStarted: {
    label: "Date Started",
    sortBy: (a, b) => {
      return new Date(a.dateStarted) - new Date(b.dateStarted);
    },
    findNullProps: (m) => {
      return m.dateStarted == "";
    },
  },
  dCompleted: {
    label: "Date Completed",
    sortBy: (a, b) => {
      return new Date(a.dateCompleted) - new Date(b.dateCompleted);
    },
    findNullProps: (m) => {
      return m.dateCompleted == "";
    },
  },
};
