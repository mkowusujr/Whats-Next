import { useState } from 'react';

import {
  bookTypes,
  videoMediaTypes,
  statuses,
  scores
} from '@/lib/form-fields';
import Select from '../common/Select';
import { apiToast } from '@/lib/data/api-base';
import { addMedia } from '@/lib/data/media';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from '../common/Dialog';

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
  const [isShown, setIsSHown] = useState(false);

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
  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const newMedia = {
        title: title,
        subTitle: subTitle,
        mediaType: mediaType,
        score: score,
        status: status
      };

      addMedia(newMedia)
        .then(m => {
          addToList(m);
          setTitle('');
          setSubTitle('');
          setMediaType('');
          setScore(0);
          setStatus('');
          res(`Successfully added ${m.title}`);
        })
        .catch(err => rej(err));
    });

    apiToast(callAPI);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="align-center fixed bottom-4 left-4 z-30 flex rounded-md bg-slate-800/80 px-4 py-2 text-2xl font-bold text-white shadow-lg  backdrop-blur-md">
          <PlusCircleIcon className="mr-2 size-8" />
          <span>{pageName} Next?</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col justify-between gap-4 rounded-md bg-white/80 p-6 text-2xl backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add Title"
              autoComplete="off"
              className="block rounded-t-md border-2 p-1 md:rounded-s-md"
              required
            />
            <input
              type="text"
              name="subTitle"
              value={subTitle}
              onChange={e => setSubTitle(e.target.value)}
              placeholder="Add Subtitle"
              className="block rounded-b-md border-2 p-1 md:rounded-e-md"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Select
              name={'mediaType'}
              value={mediaType}
              options={allowedMediaOptions}
              onChange={e => setMediaType(e.target.value)}
              className='rounded-md'
              isRequired={true}
            />
            <Select
              name={'score'}
              value={score}
              options={scores}
              onChange={e => setScore(e.target.value)}
              className='rounded-md'
            />
            <Select
              name={'status'}
              value={status}
              options={statuses}
              onChange={e => setStatus(e.target.value)}
              className='rounded-md'
            />
          </div>
          <input type="submit" value="Post" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
