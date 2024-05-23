import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from '@/components/DEPRICATED/common/Dialog';
import { SetStateAction, useState } from 'react';
import { updateMedia } from '@/lib/data/media';
import { storageTypes } from '@/lib/form-fields';
import Select from '@/components/DEPRICATED/common/Select';
import { SelectMediaScore, SelectMediaStatus } from './MediaSelectInputs';

export default function EditMedia({
  media,
  setMediaData
}: {
  media: Media;
  updateList: any;
  setMediaData: React.Dispatch<React.SetStateAction<Media>>;
}) {
  const [title, setTitle] = useState(media.title);
  const [subTitle, setSubTitle] = useState(media.subTitle ?? '');
  const [score, setScore] = useState(media.score);
  const [status, setStatus] = useState(media.status ?? '');
  const [storage, setStorage] = useState(media.storage ?? '');
  const [link, setLink] = useState(media.link ?? '');
  const [imgSrc, setImgSrc] = useState(media.img ?? '');
  const [summary, setSummary] = useState(media.summary ?? '');

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const updatedMedia = {
      ...media,
      title: title,
      subTitle: subTitle,
      score: +score,
      status: status,
      storage: storage,
      link: link,
      img: imgSrc,
      summary: summary
    };
    updateMedia(updatedMedia).catch(err => console.error(err));
    setMediaData(updatedMedia);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button>
            <PencilSquareIcon className="size-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <form
            className="text-netural flex flex-col justify-between gap-4 rounded-md bg-base-300 p-6 text-2xl"
            onSubmit={handleUpdate}
          >
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                name="title"
                value={title}
                size={title.length}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add Title"
                autoComplete="off"
                className="flex-grow rounded-t-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none md:rounded-e-none md:rounded-s-md"
                required
              />
              <input
                type="text"
                name="subTitle"
                value={subTitle}
                size={subTitle?.length ?? 3}
                onChange={e => setSubTitle(e.target.value)}
                placeholder="Add Subtitle"
                className="rounded-b-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none md:rounded-e-md md:rounded-s-none"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 lg:mx-auto lg:flex-row">
              <SelectMediaScore score={score} setScore={setScore} />
              <SelectMediaStatus status={status} setStatus={setStatus} />
              <Select
                name={'storage'}
                value={storage}
                options={storageTypes}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setStorage(e.target.value)
                }
              />
            </div>
            <label className="text-base text-primary">
              Media Link
              <input
                type="text"
                name="link"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="Add Link"
                className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
                autoComplete="off"
              />
            </label>
            <label className="text-base text-primary">
              Image Source
              <input
                type="text"
                name="imgSrc"
                value={imgSrc}
                onChange={e => setImgSrc(e.target.value)}
                placeholder="Add Img Src"
                className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
                autoComplete="off"
              />
            </label>
            <label className="text-base text-primary">
              Summary
              <textarea
                name="summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Add summary"
                className="w-full resize-none rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
                autoComplete="off"
              ></textarea>
            </label>
            <DialogClose
              className="rounded-md bg-primary px-4 py-1 text-secondary outline-none"
              onClose={e => handleUpdate(e)}
            >
              <div>Update Media</div>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
