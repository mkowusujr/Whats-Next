import { useState } from 'react';
import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '@/lib/form-fields';
import useSubsequentEffect from '@/lib/hooks/useSubsequentEffect';
import Select from '@/components/common/Select';
import { deleteProgress, updateProgress } from '@/lib/data/progress';

type ProgressItemProps = {
  /** The type of media (e.g., book, video) being tracked. */
  mediaType: string;
  /** The progress information for the media item. */
  progress: Progress;
  /** Function to remove the progress item from the list. */
  removeFromList: RemoveFromList;
};

/**
 * Component representing an individual progress tracker item for a media item.
 *
 * @returns The rendered ProgressItem component.
 */
export default function ProgressItem({
  mediaType,
  progress,
  removeFromList
}: ProgressItemProps) {
  const [title, setTitle] = useState(progress.title);
  const [current, setCurrent] = useState(progress.current);
  const [total, setTotal] = useState(progress.total);
  const [unit, setUnit] = useState(progress.unit);
  const [dateStarted, setDateStarted] = useState(progress.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(progress.dateCompleted);

  // Use a custom effect hook that only triggers on subsequent renders
  useSubsequentEffect(() => {
    const updatedProgress = {
      title: title,
      current: +current,
      total: +total,
      unit: unit,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
      mediaID: +progress.mediaID,
      id: +progress.id
    };

    // Update progress when dependencies change
    updateProgress(updatedProgress).catch(err => console.error(err));
  }, [title, current, total, unit, dateStarted, dateCompleted]);

  /**
   * Deletes the progress tracker item and removes it from the list.
   */
  const deleteProgressTracker = () => {
    if (removeFromList) {
      deleteProgress(progress.id)
        .then(() => removeFromList(progress.id))
        .catch(err => console.error(err));
    }
  };

  const titleInput = (
    <input
      type="text"
      value={title}
      placeholder="Title"
      onChange={e => setTitle(e.target.value)}
      autoComplete="off"
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  const currentInput = (
    <input
      name="current"
      type="number"
      value={current}
      min={0}
      max={total}
      size={3}
      disabled={total === undefined}
      onChange={e => setCurrent(+e.target.value)}
      autoComplete="off"
      className="rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  const totalInput = (
    <input
      name="total"
      type="number"
      value={total}
      min={0}
      size={3}
      onChange={e => setTotal(+e.target.value)}
      autoComplete="off"
      className="rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  let unitOptions: any[] = [];
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
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
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

  const deleteBtn = (
    <button
      className="cursor-pointer rounded-md bg-base-100 px-4 py-1 text-primary outline-none"
      onClick={deleteProgressTracker}
    >
      Delete Progress
    </button>
  );

  return (
    <div className="mt-10 flex flex-col gap-4">
      <hr className="mb-6 border-2 border-primary" />
      <>{titleInput}</>
      <div className="mx-auto flex gap-2">
        <>{currentInput}</>
        <span className="my-auto text-primary">/</span>
        <>{totalInput}</>
        <>{unitInput}</>
      </div>
      <div className="flex gap-2">
        <>{dateStartedtInput}</>
        <>{dateCompletedtInput}</>
      </div>
      <>{deleteBtn}</>
    </div>
  );
}
