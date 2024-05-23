import { useState } from 'react';
import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '@/lib/form-fields';
import Select from '@/components/DEPRICATED/common/Select';
import { apiToast } from '@/lib/data/api-base';
import { addProgress } from '@/lib/data/progress';

type AddProjectItemProps = {
  /** The ID of the media item being tracked. */
  mediaID: number;
  /** Function to add the new progress to the list. */
  addToList: AddToList<Progress>;
  /** The type of media (e.g., book, video) being tracked. */
  mediaType: string;
};

/** Component for adding progress tracking information for a media item. */
export default function AddProjectItem({
  mediaID,
  addToList,
  mediaType
}: AddProjectItemProps) {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const callAPI = new Promise<string>((res, rej) => {
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
          addToList(newProgress!);
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
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
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
      placeholder="Curr"
      className="rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
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
      placeholder="Goal"
      className="rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
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
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
    />
  );

  const dateCompletedtInput = (
    <input
      name="dateCompleted"
      type="date"
      value={dateCompleted}
      onChange={e => setDateCompleted(e.target.value)}
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
    />
  );

  return (
    <div>
      <form
        className="flex flex-col justify-between gap-4 rounded-sm text-2xl"
        onSubmit={handleSubmit}
      >
        <>{titleInput}</>
        <div className="flex flex-col gap-2 lg:mx-auto lg:flex-row">
          <>{currentInput}</>
          <>{totalInput}</>
          <>{unitInput}</>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <>{dateStartedtInput}</>
          <>{dateCompletedtInput}</>
        </div>
        <>
          <input
            type="submit"
            value="Add Progress"
            className="cursor-pointer rounded-md bg-primary px-4 py-1 text-secondary outline-none"
          />
        </>
      </form>
    </div>
  );
}
