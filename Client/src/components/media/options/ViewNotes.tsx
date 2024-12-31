import { BookOpenIcon } from '@heroicons/react/24/outline';
import MediaNotes from '@/components/notes/MediaNotes';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import IconDialogTrigger from '@/components/shared/IconDialogTrigger';

export const ViewNotes = ({ media }: { media: Media }) => {
  return (
    <div>
      <Dialog>
        <IconDialogTrigger HeroIcon={BookOpenIcon} />
        <DialogContent>
          <div className="bg-base-300 text-neutral flex flex-col justify-between gap-4 rounded-md p-6 text-2xl">
            <MediaNotes mediaID={media.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
