import { PropTypes } from 'prop-types';

import '../../sass/media_list.scss';
import { Suspense, lazy } from 'react';

import MediaCell from './MediaCell';
// import  MediaCellSkeleton  from '../skeletons/MediaCellSkeleton';
// import { MediaListSkeleton } from '../skeletons/MediaListSkeleton';

/**
 * Functional component for displaying a list of media items.
 *
 * @param {Object} props - The component's props.
 * @param {JSX.Element} props.filterComponent - The element used to filter results
 * @param {string} props.mediaType - The type of media to be displayed ('Watch' or 'Read').
 * @param {Array} props.mediaList - The list of media items to be displayed.
 * @param {function} props.removeFromList - Callback function to remove a media item from the list.
 * @param {function} props.updateList - Callback function to update the list after a change.
 * @returns {JSX.Element} - The rendered MediaList component.
 */
export default function MediaList({
  filterComponent,
  mediaType,
  mediaList,
  removeFromList,
  updateList
}) {
  // Skeleton loader for loading state

  // const MediaListSkeleton = [];
  // for (let i = 0; i <= 6; i++) {
  //   MediaListSkeleton.push(<MediaCellSkeleton key={i} />);
  // }

  const MediaItems = () => {
    // const MediaCell = lazy(() => import('./MediaCell'));
    return mediaList.map(m => (
      // <Suspense fallback={<MediaCellSkeleton />}>
      <MediaCell
        key={m.id}
        media={m}
        removeFromList={removeFromList}
        updateList={updateList}
      />
      // </Suspense>
    ));
  };

  return (
    <>
      <>{filterComponent}</>
      <div className="media-list">
        <MediaItems />
        {/* <>{mediaList ? <MediaItems /> : <MediaListSkeleton />}</> */}
      </div>
    </>
  );
}

MediaList.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediaList: PropTypes.array,
  removeFromList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  filterComponent: PropTypes.element.isRequired
};
