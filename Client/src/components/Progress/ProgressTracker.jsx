import { PropTypes } from 'prop-types';

import AddProjectItem from './AddProgressItem';
import ProgressItem from './ProgressItem';

/**
 * Component representing a progress tracker for a media item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.media - The media information for which progress is being tracked.
 * @param {Array} props.progressTrackingUtils - An array containing state variable and its setter function for progress tracking.
 * @returns {JSX.Element} - The rendered ProjectTracker component.
 */
export default function ProjectTracker({ media, progressTrackingUtils }) {
  const [progressList, setProgressList] = progressTrackingUtils;

  /**
   * Adds a progress item to the progress list.
   * @param {Object} item - The progress item to be added.
   */
  const addToList = item => {
    setProgressList([item, ...progressList]);
  };

  /**
   * Removes a progress item from the progress list.
   * @param {number} id - The ID of the progress item to be removed.
   */
  const removeFromList = id => {
    setProgressList(progressList.filter(p => p.id != id));
  };

  const progressItems = progressList.map(p => (
    <ProgressItem
      key={p.id}
      progress={p}
      mediaType={media.mediaType}
      removeFromList={removeFromList}
    />
  ));

  return (
    <>
      <h2>Progreess tracker</h2>
      <AddProjectItem
        mediaID={media.id}
        mediaType={media.mediaType}
        addToList={addToList}
      />
      <h3>Progress History</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{progressItems}</tbody>
      </table>
    </>
  );
}

ProjectTracker.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number,
    mediaType: PropTypes.string
  }).isRequired,
  ckingUtils: PropTypes.array.isRequired
};
