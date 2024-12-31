import { listProgressForMedia } from '@/lib/data/progress';
import AddProgressItem from './AddProgressItem';
import ProgressItem from './ProgressItem';
import { useQuery } from '@tanstack/react-query';

type ProgressTrackerProps = {
  /** The media information for which progress is being tracked. */
  media: Media;
};

/** Component representing a progress tracker for a media item. */
export default function ProgressTracker({ media }: ProgressTrackerProps) {
  const { data: progressList, isPending } = useQuery({
    queryKey: [`progress-list-${media.id}`],
    queryFn: () => listProgressForMedia(media.id)
  });

  if (isPending || !progressList) {
    return <div>Loading...</div>;
  }

  const ProgressItems = () =>
    progressList.map(p => (
      <ProgressItem
        key={p.id}
        progress={p}
        mediaType={media.mediaType.mediaType}
      />
    ));

  return (
    <div className="media-item-progress-tracker">
      <h2 className="bg-base-300 text-primary sticky top-0 z-50 w-full py-2 text-center font-semibold">
        Progress Tracker
      </h2>
      <AddProgressItem
        mediaID={media.id}
        mediaType={media.mediaType.mediaType}
        progressUnit={media.currentProgress.unit}
      />
      <ProgressItems />
    </div>
  );
}
