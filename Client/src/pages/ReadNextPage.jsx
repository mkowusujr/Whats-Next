import AddMedia from '../components/media/AddMedia';
import MediaList from '../components/media/MediaList';
import { bookTypes, sortByOptions } from '../components/utils/FormFields';
import { useEffect, useState } from 'react';
import { listMedia } from '../services/media.service';
import Filter from '../components/media/Filter';
import '../sass/pages.scss';

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

  const removeFromList = id => {
    setMediaList(mediaList.filter(i => i.id != id));
  };

  const updateList = item => {
    setMediaList([item, ...mediaList.filter(i => i.id != item.id)]);
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
    <div className="list-page">
      <AddMedia mediaType="Read" addToList={addToList} />
      <MediaList
        mediaType='Read'
        mediaList={filters.isAsc ? filteredList : filteredList.reverse()}
        removeFromList={removeFromList}
        updateList={updateList}
        filterComponent={<Filter filters={{ get: filters, set: setFilters }} />}
      />
    </div>
  );
}
