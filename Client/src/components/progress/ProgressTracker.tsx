import { listProgressForMedia } from '@/lib/data/progress';
import AddProjessItem from './AddProgressItem';
import ProgressItem from './ProgressItem';
import { useQuery } from '@tanstack/react-query';

type ProgressTrackerProps = {
  /** The media information for which progress is being tracked. */
  media: Media;
};

/** Component representing a progress tracker for a media item. */
export default function ProgressTracker({ media }: ProgressTrackerProps) {
  const { data: progressList, isPending } = useQuery({
    queryKey: ['progress-list'],
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
      <h2 className="sticky top-0 z-50 w-full bg-base-300 py-2 text-center font-semibold text-primary">
        Progress Tracker
      </h2>
      <AddProjessItem
        mediaID={media.id}
        mediaType={media.mediaType.mediaType}
        progressUnit={media.currentProgress.unit}
      />
      <ProgressItems />
    </div>
  );
}
