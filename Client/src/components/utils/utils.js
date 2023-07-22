import { sortByOptions } from './FormFields';

export const titleCase = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const toYear = timestamp => {
  const date = new Date(timestamp);
  return `${timestamp}`.length == 4 ? timestamp : date.getFullYear();
};

const getSortUtils = option => {
  const sortOption = Object.values(sortByOptions).find(o => o.label == option);
  return {
    sortByProp: sortOption.sortBy,
    findNullProps: sortOption.findNullProps
  };
};

export const applyFilters = (items, filters) => {
  if (filters.title) {
    items = items.filter(m =>
      m.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }

  if (filters.name) {
    items = items.filter(m =>
      m.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  if (filters.watchStatus && filters.watchStatus != '') {
    items = items.filter(m => filters.watchStatus === m.watchStatus);
  }

  if (filters.readingStatus && filters.readingStatus != '') {
    items = items.filter(m => filters.readingStatus === m.readingStatus);
  }

  if (filters.mediaType && filters.mediaType != '') {
    items = items.filter(m => filters.mediaType === m.mediaType);
  }

  if (filters.bookType && filters.bookType != '') {
    items = items.filter(m =>
      JSON.parse(m.categories).includes(filters.bookType)
    );
  }

  if (filters.sortBy.prop) {
    const { sortByProp, findNullProps } = getSortUtils(filters.sortBy.prop);

    const nullMedia = items.filter(findNullProps);
    const sortedMediaList = items
      .filter(m => !findNullProps(m))
      .sort(sortByProp);

    items = sortedMediaList;

    if (filters.sortBy.desc) {
      items = items.reverse();
    }

    items = [...sortedMediaList, ...nullMedia];
  }

  return items;
};
