import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ProgressTracker from '@/components/progress/ProgressTracker';
import IconDialogTrigger from '@/components/shared/IconDialogTrigger';

export default function ViewProgress({ media }: { media: Media }) {
  return (
    <div>
      <Dialog>
        <IconDialogTrigger HeroIcon={PresentationChartLineIcon} />
        <DialogContent className="flex flex-col justify-between gap-4 overflow-scroll">
          <ProgressTracker media={media} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
