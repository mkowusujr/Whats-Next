import { useEffect, useState } from 'react';
import { sortByOptions } from '@/lib/form-fields';

export const useFilters = (
  mediaTypes: string[],
  list: Media[]
): [Filter, React.Dispatch<React.SetStateAction<Filter>>, Media[]] => {
  const [finalList, setFinalList] = useState<Media[]>([])
  const [filters, setFilters] = useState<Filter>({
    name: '',
    mediaTypes: [...mediaTypes],
    score: '0',
    status: '',
    sortBy: 'Date Released',
    isAsc: false
  });


  const filtersProp = { get: filters, set: setFilters };

  useEffect(() => {
    const filteredList = list
      ? [...list]
        .filter(m => {
          return (
            (m.title + (m.subTitle ?? '')).includes(filters.name) &&
            filters.mediaTypes.includes(m.mediaType) &&
            (+filters.score !== 0 ? +filters.score === m.score : true) &&
            (filters.status !== '' ? filters.status == m.status : true)
          );
        })
        .sort(sortByOptions.find(s => s.label == filters.sortBy)!.sortBy)
      : list;
    const preparedList = filtersProp.get.isAsc
      ? filteredList
      : filteredList?.reverse() ?? filteredList;
    setFinalList(preparedList)
  }, [filters, list])

  return [filters, setFilters, finalList];
};
