import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/common/Dialog';
import { SetStateAction, useState } from 'react';
import { updateMedia } from '@/lib/data/media';
import { scores, statuses, storageTypes } from '@/lib/form-fields';
import Select from '@/components/common/Select';

export default function EditMedia({
  media,
  updateList
}: {
  media: Media;
  updateList: any;
}) {
  const [title, setTitle] = useState(media.title);
  const [subTitle, setSubTitle] = useState(media.subTitle);
  const [score, setScore] = useState(media.score);
  const [status, setStatus] = useState(media.status);
  const [storage, setStorage] = useState(media.storage);
  const [link, setLink] = useState(media.link);
  const [imgSrc, setImgSrc] = useState(media.img);
  const [summary, setSummary] = useState(media.summary);

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
    updateList(media);
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
              <Select
                name={'score'}
                value={score}
                options={scores}
                onChange={(e: { target: { value: SetStateAction<number> } }) =>
                  setScore(e.target.value)
                }
              />
              <Select
                name={'status'}
                value={status}
                options={statuses}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setStatus(e.target.value)
                }
              />
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
                className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
                autoComplete="off"
              ></textarea>
            </label>
            <input
              className="cursor-pointer rounded-md bg-primary px-4 py-1 text-secondary outline-none"
              type="submit"
              value="Update Media"
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
