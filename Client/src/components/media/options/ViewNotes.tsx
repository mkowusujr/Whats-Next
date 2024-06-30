import { BookOpenIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/DEPRICATED/common/Dialog';
import MediaNotes from '@/components/DEPRICATED/common/notes/MediaNotes';

export const ViewNotes = ({ media }: { media: Media }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button>
            <BookOpenIcon className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-between gap-4 rounded-md bg-base-300 p-6 text-2xl text-neutral">
            <MediaNotes mediaID={media.id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
