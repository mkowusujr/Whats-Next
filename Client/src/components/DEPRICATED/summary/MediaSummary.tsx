import { getMediaFullTitle } from '@/lib/utils/media-utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { updateMedia } from '@/lib/data/media';
import { useState } from 'react';
import {
  SelectMediaScore,
  SelectMediaStatus
} from '../media/MediaOptions/MediaSelectInputs';
import { DialogClose } from '../DEPRICATED/common/Dialog';

export default function MediaSummary({ media }: { media: Media }) {
  const [status, setStatus] = useState(media.status);
  const [score, setScore] = useState(media.score);

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const updatedMedia = {
      ...media,
      score: score,
      status: status
    };

    updateMedia(updatedMedia).catch(err => console.error(err));
  };
  return (
    <div className="flex justify-center gap-4">
      <LazyLoadImage
        src={media.img}
        className="my-auto h-72 w-48 rounded-md"
        placeholder={
          <div className="h-72 w-48 animate-pulse bg-gray-400"></div>
        }
      />
      <form className="my-auto flex flex-col gap-4" onSubmit={handleUpdate}>
        <h2 className="text-2xl font-semibold text-primary">
          {getMediaFullTitle(media)}
        </h2>
        <div className="flex justify-around gap-4">
          <SelectMediaStatus status={status} setStatus={setStatus} />
          <SelectMediaScore score={score} setScore={setScore} />
        </div>
        <textarea
          className="min-h-40 resize-none rounded-md bg-secondary p-2 px-4 py-1 text-lg"
          value={media.summary}
          disabled
        ></textarea>
        <DialogClose
          className="rounded-md bg-primary px-4 py-1 text-secondary outline-none"
          onClose={e => handleUpdate(e)}
        >
          <div>Update Media</div>
        </DialogClose>
      </form>
    </div>
  );
}
