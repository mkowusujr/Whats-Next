import AddMedia from '../components/media/AddMedia';
import MediaList from '../components/media/MediaList';
import { bookTypes } from '../components/utils/FormFields';
import { useEffect, useState } from 'react';
import { listMedia } from '../services/media.service';

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

  return (
    <>
      <AddMedia mediaType="Read" addToList={addToList} />
      <MediaList mediaList={mediaList} />;
    </>
  );
}
