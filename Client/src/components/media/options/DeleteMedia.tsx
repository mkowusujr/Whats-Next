import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteMedia } from '@/lib/data/media';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function DeleteMedia({ mediaId }: { mediaId: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (mediaId: number) => {
      await deleteMedia(mediaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    }
  });

  // Button click handler for deleting the media item
  const handleDeletion = async () => {
    await mutation.mutateAsync(mediaId);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <TrashIcon className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-base-300">
          <span>Are you sure?</span>
          <button onClick={handleDeletion}>Yes</button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
