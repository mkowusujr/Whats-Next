import { useState, useEffect } from 'react';
import AddMediaForm from './AddMediaForm';
import MediaTable from './MediaTable';
import { listMedia } from '../../services/media.service';
import Filter from './Filter';
import '../../sass/media/Media.scss';
import MediaDetails from './MediaDetails';

export default function Media(props) {
  const [mediaList, setMediaListTo] = useState([]);
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('filters')) ?? {
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
  }, [filters]);

  return (
    <div className="media">
      <div className="media-display">
        <AddMediaForm updateMediaList={updateMediaList} />
        <Filter filterProps={filterProps} />
        <MediaTable
          mediaList={mediaList}
          updateMediaList={updateMediaList}
          show={filters.watchStatus}
          imgUrlUtils={imgUrlUtils}
          setSelectedMedia={setSelectedMedia}
        />
        {/* <footer
          style={{
            color: data.vibrant,
          }}
        >
          Created by Mathew Owusu Jr
        </footer> */}
      </div>
      <>
        {selectedMedia ? (
          <MediaDetails media={selectedMedia} />
        ) : (
          <p className="media-details">No Media Selected</p>
        )}
      </>
    </div>
  );
}
