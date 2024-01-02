import { PropTypes } from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import MediaItem from './MediaItem';
import '../../sass/media.scss';

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
  // Map media items to MediaItem components
  const mediaItems = mediaList.map(m => (
    <MediaItem
      key={m.id}
      media={m}
      removeFromList={removeFromList}
      updateList={updateList}
    />
  ));

  // Skeleton loader for loading state
  const loadingSkeleton = (
    <tr className="media-item">
      <td>
        <Skeleton variant="rectangular" height={75} width={50} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={195} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={44} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={127} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={95} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={73} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={58} />
      </td>
    </tr>
  );

  return (
    <div className="media-list">
      <h2 className="title">{mediaType} Next </h2>
      <>{filterComponent}</>
      <hr className="media-hr"></hr>
      <table>
        <tbody>
          <>
            {mediaItems.length != 0 ? (
              <>{mediaItems}</>
            ) : (
              <>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
              </>
            )}
          </>
        </tbody>
      </table>
    </div>
  );
}

MediaList.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediaList: PropTypes.array.isRequired,
  removeFromList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  filterComponent: PropTypes.element.isRequired
};
