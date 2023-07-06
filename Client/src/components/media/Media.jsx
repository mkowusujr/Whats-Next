import { useState, useEffect } from 'react';
import AddMediaForm from './AddMediaForm';
import { listMedia } from '../../services/media.service';
import MediaFilter from './MediaFilter';
import '../../sass/media/Media.scss';
import MediaDetails from './MediaDetails';
import Category from '../utils/Category';
import CategoryTable from '../utils/CategoryTable';
import MediaRow from './MediaRow';
export default function Media(props) {
  const [mediaList, setMediaListTo] = useState([]);
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('mediaFilters')) ?? {
      sortBy: {
        prop: 'Personal Rating',
        desc: true
      },
      mediaType: '',
      watchStatus: ''
    }
  );
  
  const [selectedMedia, setSelectedMedia] = useState(null);

  const imgUrlUtils = props.imgUrlUtils;

  const filterProps = { filters, setFilters };

  const updateMediaList = () => {
    listMedia(filters)
      .then(mediaList => setMediaListTo(mediaList))
      .catch(err => console.error(err));
  };
useEffect(() => {
  updateMediaList();
}, []);
  useEffect(() => {
    updateMediaList();
  }, [filters]);

  return (
    <>
      <Category
        AddForm={<AddMediaForm updateMediaList={updateMediaList} />}
        CategoryFilter={<MediaFilter filterProps={filterProps} />}
        ItemDetails={<MediaDetails media={selectedMedia} />}
        selectedRow={selectedMedia}
        Table={
          <CategoryTable
            categoryList={mediaList}
            show={filters.watchStatus}
            imgUrlUtils={imgUrlUtils}
            setSelectedItem={setSelectedMedia}
            updateCategoryList={updateMediaList}
            rowElement={MediaRow}
          />
        }
      />
    </>
  );
  
}
