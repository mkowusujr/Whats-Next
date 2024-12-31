import IconDialogTrigger from '@/components/shared/IconDialogTrigger';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export const ViewSummary = ({ mediaSummary }: { mediaSummary: string }) => (
  <Dialog>
    <IconDialogTrigger HeroIcon={InformationCircleIcon} />

    <DialogContent>
      <p>{mediaSummary}</p>
    </DialogContent>
  </Dialog>
);
