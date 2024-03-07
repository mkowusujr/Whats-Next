import AddProjectItem from './AddProgressItem';
import ProgressItem from './ProgressItem';

type ProjectTrackerProps = {
  /** The media information for which progress is being tracked. */
  media: Media;
  /** An array containing state variable and its setter function for progress tracking. */
  progressTrackingUtils: any[];
};

/** Component representing a progress tracker for a media item. */
export default function ProjectTracker({ media, progressTrackingUtils }: ProjectTrackerProps) {
  const [progressList, setProgressList] = progressTrackingUtils;

  /**
   * Adds a progress item to the progress list.
   * @param {Object} item - The progress item to be added.
   */
  const addToList = (item: Media) => {
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
    <div className="media-item-progress-tracker">
      <h2>Progreess tracker</h2>
      <AddProjectItem
        mediaID={media.id}
        mediaType={media.mediaType}
        addToList={addToList}
      />
      <h3>Progress History</h3>

      <>{progressItems}</>
    </div>
  );
}
