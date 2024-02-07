import { useState } from 'react';
import { sortByOptions } from './form-fields';

export const useFilters = (mediaTypes, list) => {
  const [filters, setFilters] = useState({
    name: '',
    mediaTypes: [...mediaTypes],
    score: 0,
    status: '',
    sortBy: 'Date Started',
    isAsc: false
  });

  const filteredList = list
    ? [...list]
        .filter(m => {
          return (
            (m.title + (m.subTitle ?? '')).includes(filters.name) &&
            filters.mediaTypes.includes(m.mediaType) &&
            (filters.score != 0 ? filters.score.includes(m.score) : true) &&
            (filters.status != '' ? filters.status == m.status : true)
          );
        })
        .sort(sortByOptions.find(s => s.label == filters.sortBy).sortBy)
    : list;

  const filtersProp = { get: filters, set: setFilters };

  const finalList = filtersProp.get.isAsc
    ? filteredList
    : filteredList?.reverse() ?? filteredList;

  return [filters, setFilters, finalList];
};
