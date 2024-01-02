import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { sortByOptions } from './FormFields';
import AddMedia from '../../components/media/AddMedia';
import MediaList from '../../components/media/MediaList';
import Filter from '../../components/media/Filter';
import { listMedia } from '../../services/media.service';

/**
 * Functional component representing a page that displays a list of media items.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} props.mediaTypes - An array of media types.
 * @param {string} props.pageName - The name of the page.
 * @returns {JSX.Element} - The rendered ListPage component.
 */
export default function ListPage({ mediaTypes, pageName }) {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    listMedia(mediaTypes)
      .then(ms => setMediaList(ms))
      .catch(err => console.error(err));
  }, []);

  /**
   * Adds a new media item to the list.
   *
   * @param {Object} item - The media item to be added.
   */
  const addToList = item => {
    setMediaList([item, ...mediaList]);
  };

  /**
   * Removes a media item from the list based on its ID.
   *
   * @param {number} id - The ID of the media item to be removed.
   */
  const removeFromList = id => {
    setMediaList(mediaList.filter(i => i.id != id));
  };

  /**
   * Updates the list by replacing an existing media item with a new one.
   *
   * @param {Object} item - The updated media item.
   */
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

  const filtersProp = { get: filters, set: setFilters };

  return (
    <div className="list-page">
      <AddMedia pageName={pageName} addToList={addToList} />
      <MediaList
        mediaType={pageName}
        mediaList={
          filtersProp.get.isAsc ? filteredList : filteredList.reverse()
        }
        removeFromList={removeFromList}
        updateList={updateList}
        filterComponent={<Filter filters={filtersProp} />}
      />
    </div>
  );
}

ListPage.propTypes = {
  mediaTypes: PropTypes.array.isRequired,
  pageName: PropTypes.string.isRequired
};
