import { listProgressForMedia } from '@/lib/data/progress';
import { useListUtils } from '@/lib/hooks/useListUtils';
import AddProjectItem from './AddProgressItem';
import ProgressItem from './ProgressItem';

type ProjectTrackerProps = {
  /** The media information for which progress is being tracked. */
  media: Media;
};

/** Component representing a progress tracker for a media item. */
export default function ProgressTracker({ media }: ProjectTrackerProps) {
  const {
    list: progressList,
    addToList,
    removeFromList
  } = useListUtils(() => listProgressForMedia(media.id));

  const ProgressItems = () =>
    progressList.map(p => (
      <ProgressItem
        key={p.id}
        progress={p}
        mediaType={media.mediaType}
        removeFromList={removeFromList}
      />
    ));

  return (
    <div className="media-item-progress-tracker">
      <h2 className="sticky top-0 z-50 w-full bg-base-300 py-2 text-center font-semibold text-primary">
        Progress Tracker
      </h2>
      <AddProjectItem
        mediaID={media.id}
        mediaType={media.mediaType}
        addToList={addToList}
      />
      <ProgressItems />
    </div>
  );
}
