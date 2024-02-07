import PropTypes from 'prop-types';

import AddMedia from '../../components/media/AddMedia';
import MediaList from '../../components/media/MediaList';
import Filter from '../../components/media/Filter';
import { listMedia } from '../../lib/media.service';
import { useListUtils } from '../../lib/useListUtils';
import { useFilters } from '../../lib/useFilters';

/**
 * Functional component representing a page that displays a list of media items.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} props.mediaTypes - An array of media types.
 * @param {string} props.pageName - The name of the page.
 * @returns {JSX.Element} - The rendered ListPage component.
 */
export default function ListPage({ mediaTypes, pageName }) {
  const [mediaList, addToList, removeFromList, updateList] = useListUtils(() =>
    listMedia(mediaTypes)
  );

  const [filters, setFilters, filteredList] = useFilters(mediaTypes, mediaList);

  return (
    <div>
      <AddMedia pageName={pageName} addToList={addToList} />
      <MediaList
        mediaType={pageName}
        mediaList={filteredList}
        removeFromList={removeFromList}
        updateList={updateList}
        filterComponent={<Filter filterProps={[filters, setFilters]} />}
      />
    </div>
  );
}

ListPage.propTypes = {
  mediaTypes: PropTypes.array.isRequired,
  pageName: PropTypes.string.isRequired
};
