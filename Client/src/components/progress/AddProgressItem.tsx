import { useState } from 'react';
import Select from '@/components/DEPRICATED/common/Select';
import { addProgress } from '@/lib/data/progress';
import {
  videoMediaTypes,
  mediaProgressUnits,
  bookTypes,
  bookProgressUnits
} from '@/lib/utils/form-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddProjectItemProps = {
  /** The ID of the media item being tracked. */
  mediaID: number;
  /** Function to add the new progress to the list. */
  /** The type of media (e.g., book, video) being tracked. */
  mediaType: string;
  progressUnit: string;
};

/** Component for adding progress tracking information for a media item. */
export default function AddProjessItem({
  mediaID,
  mediaType,
  progressUnit
}: AddProjectItemProps) {
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState('');
  const [total, setTotal] = useState('');
  // const [unit, setUnit] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const queryClient = useQueryClient();
  const { mutateAsync: addProgressMutation } = useMutation({
    mutationFn: (progress: CreatedProgress) => addProgress(progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress-list'] });
    }
  });

  /**
   * Handles the form submission, adds progress to the list, and makes an API call.
   *
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const progress = {
      title: title,
      current: +current,
      total: +total,
      unit: progressUnit,
      dateStarted: new Date(dateStarted).toISOString(),
      dateCompleted:
        dateCompleted === '' ? null : new Date(dateCompleted).toISOString(),
      mediaID: +mediaID
    };
    await addProgressMutation(progress);

    // const callAPI = new Promise<string>((res, rej) => {

    //   addProgress(progress)
    //     .then(newProgress => {
    //       addToList(newProgress!);
    setCurrent('');
    setTotal('');
    // setUnit('');
    setDateStarted('');
    setDateCompleted('');
    //       res('Successfully added progress');
    //     })
    //     .catch(err => rej(err));
    // });

    // apiToast(callAPI);
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
      // min={0}
      max={total}
      onChange={e => setCurrent(e.target.value)}
      disabled={total == ''}
      autoComplete="off"
      placeholder="Current"
      className="min-w-0 flex-1 rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
      required
    />
  );

  const totalInput = (
    <input
      name="total"
      type="number"
      value={total}
      // size={5}
      min={0}
      onChange={e => setTotal(e.target.value)}
      autoComplete="off"
      placeholder="Total"
      className="min-w-0 flex-1 rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
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
    <div className="flex flex-1 items-center justify-center">
      {progressUnit}
    </div>
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
        <div className="flex w-full flex-col gap-2 lg:mx-auto lg:flex-row">
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
