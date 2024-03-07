import { useState } from 'react';
import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '@/lib/form-fields';
import Select from '../common/Select';
import { apiToast } from '@/lib/data/api-base';
import { addProgress } from '@/lib/data/progress';
import { Dialog, DialogContent, DialogTrigger } from '../common/Dialog';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

type AddProjectItemProps = {
  /** The ID of the media item being tracked. */
  mediaID: number;
  /** Function to add the new progress to the list. */
  addToList: any;
  /** The type of media (e.g., book, video) being tracked. */
  mediaType: any;
};

/** Component for adding progress tracking information for a media item. */
export default function AddProjectItem({ mediaID, addToList, mediaType }:AddProjectItemProps) {
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState('');
  const [total, setTotal] = useState('');
  const [unit, setUnit] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  /**
   * Handles the form submission, adds progress to the list, and makes an API call.
   *
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const progress = {
        title: title,
        current: +current,
        total: +total,
        unit: unit,
        dateStarted: dateStarted,
        dateCompleted: dateCompleted,
        mediaID: +mediaID
      };

      addProgress(progress)
        .then(newProgress => {
          addToList(newProgress);
          setCurrent('');
          setTotal('');
          setUnit('');
          setDateStarted('');
          setDateCompleted('');
          res('Successfully added progress');
        })
        .catch(err => rej(err));
    });

    apiToast(callAPI);
  };

  const titleInput = (
    <input
      type="text"
      value={title}
      placeholder="Title"
      onChange={e => setTitle(e.target.value)}
      autoComplete="off"
      required
    />
  );

  const currentInput = (
    <input
      name="current"
      type="number"
      value={current}
      size={5}
      min={0}
      max={total}
      onChange={e => setCurrent(e.target.value)}
      disabled={total == ''}
      autoComplete="off"
      required
    />
  );

  const totalInput = (
    <input
      name="total"
      type="number"
      value={total}
      size={5}
      min={0}
      onChange={e => setTotal(e.target.value)}
      autoComplete="off"
      required
    />
  );

  let unitOptions: {}[] = [];
  if (videoMediaTypes.map(i => i.label).includes(mediaType)) {
    unitOptions = mediaProgressUnits;
  } else if (bookTypes.map(i => i.label).includes(mediaType)) {
    unitOptions = bookProgressUnits;
  }

  const unitInput = (
    <Select
      name={'unit'}
      value={unit}
      options={unitOptions}
      onChange={e => setUnit(e.target.value)}
      isRequired={true}
    />
  );

  const dateStartedtInput = (
    <input
      name="dateStarted"
      type="date"
      value={dateStarted}
      onChange={e => setDateStarted(e.target.value)}
      required
    />
  );

  const dateCompletedtInput = (
    <input
      name="dateCompleted"
      type="date"
      value={dateCompleted}
      onChange={e => setDateCompleted(e.target.value)}
    />
  );

  return (
    <Dialog>
      <DialogTrigger>
        <button>
          <button className="align-center fixed bottom-4 left-4 z-30 flex rounded-md bg-slate-800/80 px-4 py-2 text-2xl font-bold text-white shadow-lg  backdrop-blur-md">
            <PlusCircleIcon className="mr-2 size-8" />
            <span>Add Progress</span>
          </button>
        </button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex w-[300px] flex-col justify-between gap-4 rounded-sm bg-white/80 p-6 text-2xl backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <>{titleInput}</>
          <div>
            <>{currentInput}</>
            <>{totalInput}</>
            <>{unitInput}</>
          </div>
          <div>
            <>{dateStartedtInput}</>
            <>{dateCompletedtInput}</>
          </div>
          <>
            <input type="submit" value="Add Progress" />
          </>
        </form>
      </DialogContent>
    </Dialog>
  );
}
