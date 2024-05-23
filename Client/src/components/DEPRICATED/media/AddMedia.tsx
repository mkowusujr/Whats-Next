import { useState } from 'react';

import {
  bookTypes,
  videoMediaTypes,
  statuses,
  scores
} from '@/lib/form-fields';
import Select from '@/components/DEPRICATED/common/Select';
import { apiToast } from '@/lib/data/api-base';
import { addMedia } from '@/lib/data/media';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/DEPRICATED/common/Dialog';

type AddMediaProps = {
  /** The type of media to be added ('Watch' or 'Read'). */
  pageName: string;
  /** Callback function to add a new media item to the list. */
  addToList: Function;
};

/** Functional component for adding new media items. */
export default function AddMedia({ pageName, addToList }: AddMediaProps) {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [link, setLink] = useState('');

  // Options for the media type dropdown
  let allowedMediaOptions: { label: string; value: string }[] = [];
  const defaultMediaType = { label: 'MediaType', value: '' };

  switch (pageName) {
    case 'Watch':
      allowedMediaOptions = [defaultMediaType, ...videoMediaTypes];
      break;
    case 'Read':
      allowedMediaOptions = [defaultMediaType, ...bookTypes];
      break;
  }

  /**
   * Handles the form submission and calls the API to add a new media item.
   * Displays a toast notification based on API response.
   *
   * @param {Event} e - The form submission event.
   */
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const callAPI = new Promise<string>((res, rej) => {
  //     const newMedia: CreatedMedia = {
  //       title: title,
  //       subTitle: subTitle,
  //       mediaType: mediaType,
  //       score: score,
  //       status: status,
  //       link: link
  //     };

  //     addMedia(newMedia)
  //       .then(m => {
  //         addToList(m);
  //         setTitle('');
  //         setSubTitle('');
  //         setMediaType('');
  //         setScore(0);
  //         setStatus('');
  //         setLink('');
  //         res(`Successfully added ${m!.title}`);
  //       })
  //       .catch(err => rej(err));
  //   });

  //   apiToast(callAPI);
  // };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="align-center fixed bottom-4 left-4  z-30 flex rounded-md bg-accent px-4  py-2 text-2xl font-bold text-neutral opacity-90 shadow-lg">
          <PlusCircleIcon className="mr-2 size-8" />
          <span>{pageName} Next?</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col justify-between gap-4 rounded-md bg-base-300  p-6 text-2xl"
          // onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add Title"
              autoComplete="off"
              className="rounded-t-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none md:rounded-e-none md:rounded-s-md"
              required
            />
            <input
              type="text"
              name="subTitle"
              value={subTitle}
              onChange={e => setSubTitle(e.target.value)}
              placeholder="Add Subtitle"
              className="rounded-b-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none md:rounded-e-md md:rounded-s-none"
              autoComplete="off"
            />
          </div>
          <div className="mx-auto flex flex-col gap-4 md:flex-row">
            <Select
              name={'mediaType'}
              value={mediaType}
              options={allowedMediaOptions}
              onChange={e => setMediaType(e.target.value)}
              className="rounded-md"
              isRequired={true}
            />
            <Select
              name={'score'}
              value={score}
              options={scores}
              onChange={e => setScore(e.target.value)}
              className="rounded-md"
            />
            <Select
              name={'status'}
              value={status}
              options={statuses}
              onChange={e => setStatus(e.target.value)}
              className="rounded-md"
            />
          </div>
          <div>
            <input
              name="link"
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="Add Link"
              className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
              autoComplete="off"
            />
          </div>
          <input
            type="submit"
            value="Add Media"
            className="cursor-pointer rounded-md bg-primary px-4 py-1 text-secondary outline-none"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
