import { useState, useEffect } from 'react';
import AddMediaForm from './AddMediaForm';
import { listMedia } from '../../services/media.service';
import MediaFilter from './MediaFilter';
import '../../sass/media/Media.scss';
import MediaDetails from './MediaDetails';
import Category from '../utils/Category';
import CategoryTable from '../utils/CategoryTable';
import MediaRow from './MediaRow';
import { applyFilters } from '../utils/utils';

export default function Media(props) {
  const [mediaList, setMediaList] = useState([]);
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('mediaFilters')) ?? {
      sortBy: {
        prop: 'Personal Rating',
        desc: true
      },
      mediaType: '',
      watchStatus: '',
      name: ''
    }
  );
  const [selectedMedia, setSelectedMedia] = useState(null);

  const imgUrlUtils = props.imgUrlUtils;

  const filterProps = { filters, setFilters };

  useEffect(() => {
    listMedia()
      .then(mediaList => setMediaList(mediaList))
      .catch(err => console.error(err));
  }, []);

  const removeItemFromList = id =>
    setMediaList([...mediaList].filter(i => i.id != id));

  const addItemToList = item => setMediaList([...mediaList, item]);

  const updateItemInList = item =>
    setMediaList([...mediaList.filter(i => i.id != item.id), item]);

  return (
    <>
      <Category
        AddForm={<AddMediaForm addItemToList={addItemToList} />}
        ItemDetails={<MediaDetails media={selectedMedia} />}
        selectedRow={selectedMedia}
        Table={
          <CategoryTable
            filters={<MediaFilter filterProps={filterProps} />}
            categoryList={applyFilters(mediaList, filters)}
            show={filters.watchStatus}
            imgUrlUtils={imgUrlUtils}
            setSelectedItem={setSelectedMedia}
            removeItemFromList={removeItemFromList}
            updateItemInList={updateItemInList}
            rowElement={MediaRow}
          />
        }
      />
    </>
  );
}
