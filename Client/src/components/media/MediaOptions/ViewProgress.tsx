import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/common/Dialog';
import ProgressTracker from '@/components/progress/ProgressTracker';

export default function ViewProgress({ media }: { media: Media }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button>
            <PresentationChartLineIcon className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-between gap-4 rounded-md bg-base-300 px-6 pb-6 pt-2 text-2xl text-neutral">
            <ProgressTracker media={media} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
