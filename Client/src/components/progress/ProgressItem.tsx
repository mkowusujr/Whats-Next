import { useState } from 'react';
import { deleteProgress, updateProgress } from '@/lib/data/progress';
// import {
//   videoMediaTypes,
//   mediaProgressUnits,
//   bookTypes,
//   bookProgressUnits
// } from '@/lib/utils/form-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProgressItemProps = {
  /** The type of media (e.g., book, video) being tracked. */
  mediaType: string;
  /** The progress information for the media item. */
  progress: Progress;
  /** Function to remove the progress item from the list. */
};

/**
 * Component representing an individual progress tracker item for a media item.
 *
 * @returns The rendered ProgressItem component.
 */
export default function ProgressItem({
  mediaType,
  progress
}: ProgressItemProps) {
  const [title, setTitle] = useState(progress.title ?? '');
  const [current, setCurrent] = useState(progress.current ?? '');
  const [total, setTotal] = useState(progress.total ?? '');
  const [dateStarted, setDateStarted] = useState(progress.dateStarted ?? '');
  const [dateCompleted, setDateCompleted] = useState(
    progress.dateCompleted ?? ''
  );

  const { mutateAsync: updateProgressItem } = useMutation({
    mutationFn: (updatedProgress: Progress) => updateProgress(updatedProgress)
  });

  // // Update progress when dependencies change
  // updateProgress(updatedProgress).catch(err => console.error(err));
  // }, [title, current, total, unit, dateStarted, dateCompleted]);
  const queryClient = useQueryClient();
  /**
   * Deletes the progress tracker item and removes it from the list.
   */
  const { mutateAsync: deleteProgressMutation } = useMutation({
    mutationFn: () => deleteProgress(progress.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress-list'] });
    }
  });

  const titleInput = (
    <input
      type="text"
      value={title}
      placeholder="Title"
      onChange={async e => {
        setTitle(e.target.value);
        await updateProgressItem({ ...progress, title: e.target.value });
      }}
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
      placeholder="Current"
      disabled={total === undefined}
      onChange={async e => {
        setCurrent(+e.target.value);
        await updateProgressItem({ ...progress, current: +e.target.value });
      }}
      autoComplete="off"
      className="min-w-0 flex-1 rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  const totalInput = (
    <input
      name="total"
      type="number"
      value={total}
      placeholder="Total"
      min={0}
      onChange={async e => {
        setTotal(+e.target.value);
        await updateProgressItem({ ...progress, total: +e.target.value });
      }}
      autoComplete="off"
      className="min-w-0 flex-1 rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  // let unitOptions: any[] = [];
  // if (videoMediaTypes.map(i => i.label).includes(mediaType)) {
  //   unitOptions = mediaProgressUnits;
  // } else if (bookTypes.map(i => i.label).includes(mediaType)) {
  //   unitOptions = bookProgressUnits;
  // }

  const unitInput = (
    <div className="flex flex-1 items-center justify-center">
      {progress.unit}
    </div>
  );

  const dateStartedtInput = (
    <input
      name="dateStarted"
      type="date"
      value={dateStarted}
      onChange={async e => {
        setDateStarted(e.target.value);
        await updateProgressItem({ ...progress, dateStarted: e.target.value });
      }}
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  const dateCompletedtInput = (
    <input
      name="dateCompleted"
      type="date"
      value={dateCompleted}
      onChange={async e => {
        setDateCompleted(e.target.value);
        await updateProgressItem({
          ...progress,
          dateCompleted: e.target.value
        });
      }}
      className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
    />
  );

  const deleteBtn = (
    <button
      className="cursor-pointer rounded-md bg-base-100 px-4 py-1 text-primary outline-none"
      onClick={async () => await deleteProgressMutation()}
    >
      Delete Progress
    </button>
  );

  return (
    <div className="mt-10 flex flex-col gap-4">
      <hr className="mb-6 border-2 border-primary" />
      <>{titleInput}</>
      <div className="mx-auto flex w-full gap-2">
        <>{currentInput}</>
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
