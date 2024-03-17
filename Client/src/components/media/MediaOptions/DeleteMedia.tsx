import { TrashIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/common/Dialog';
import { deleteMedia } from '@/lib/data/media';

export default function DeleteMedia({
  media,
  removeFromList
}: {
  media: Media;
  removeFromList: any;
}) {
  // Button click handler for deleting the media item
  const handleDeletion = () => {
    deleteMedia(media.id)
      .then(() => removeFromList(media.id))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button>
            <TrashIcon className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-between gap-4 rounded-md bg-base-300 p-6 text-2xl text-neutral">
            <span>Are you sure?</span>
            <button onClick={handleDeletion}>Yes</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
