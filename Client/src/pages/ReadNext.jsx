import AddMedia from '../components/media/AddMedia';
import MediaList from '../components/media/MediaList';
import { bookTypes, sortByOptions } from '../components/utils/FormFields';
import { useEffect, useState } from 'react';
import { listMedia } from '../services/media.service';
import Filter from '../components/media/Filter';

export default function ReadNextPage() {
  const [mediaList, setMediaList] = useState([]);
  const mediaTypes = bookTypes.map(i => i.label);

  useEffect(() => {
    listMedia(mediaTypes)
      .then(ms => setMediaList(ms))
      .catch(err => console.error(err));
  }, []);

  const addToList = item => {
    setMediaList([item, ...mediaList]);
  };

  const [filters, setFilters] = useState({
    name: '',
    mediaTypes: [...mediaTypes],
    score: 0,
    status: '',
    sortBy: 'Date Started',
    isAsc: false
  });

  const filteredList = [...mediaList]
    .filter(m => {
      return (
        (m.title + (m.subTitle ?? '')).includes(filters.name) &&
        filters.mediaTypes.includes(m.mediaType) &&
        (filters.score != 0 ? filters.score.includes(m.score) : true) &&
        (filters.status != '' ? filters.status == m.status : true)
      );
    })
    .sort(sortByOptions.find(s => s.label == filters.sortBy).sortBy);

  return (
    <>
      <AddMedia mediaType="Read" addToList={addToList} />
      <Filter filters={{ get: filters, set: setFilters }} />
      <MediaList
        mediaList={filters.isAsc ? filteredList : filteredList.reverse()}
      />
    </>
  );
}
