import { useState } from 'react';

import { PropTypes } from 'prop-types';

import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '../common/FormFields';
import useSubsequentEffect from '../common/useSubsequentEffect';
import Select from '../common/Select';
import {
  deleteProgress,
  updateProgress
} from '../../services/progress.service';
import "../../sass/progress_tracking.scss"

/**
 * Component representing an individual progress tracker item for a media item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.mediaType - The type of media (e.g., book, video) being tracked.
 * @param {Object} props.progress - The progress information for the media item.
 * @param {function} props.removeFromList - Function to remove the progress item from the list.
 * @returns {JSX.Element} - The rendered ProgressItem component.
 */
export default function ProgressItem({ mediaType, progress, removeFromList }) {
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
      disabled={total == ''}
      onChange={e => setCurrent(e.target.value)}
      autoComplete="off"
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
      onChange={e => setTotal(e.target.value)}
      autoComplete="off"
      required
    />
  );

  let unitOptions = [];
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

  const deleteBtn = removeFromList ? (
    <td>
      <button onClick={deleteProgressTracker}>Delete Progress</button>
    </td>
  ) : (
    <></>
  );
  return (
    <div className='progress-item'>
      <>{titleInput}</>
      <div className='progress-units'>
        <>{currentInput}</>
        <>/</>
        <>{totalInput}</>
        <>{unitInput}</>
      </div>
      <div>
      <>{dateStartedtInput}</>
      <>{dateCompletedtInput}</>
      </div>
      <>{deleteBtn}</>
    </div>
  );
}

ProgressItem.propTypes = {
  mediaType: PropTypes.string.isRequired,
  progress: PropTypes.shape({
    id: PropTypes.number,
    current: PropTypes.number,
    total: PropTypes.number,
    unit: PropTypes.string,
    dateStarted: PropTypes.string,
    dateCompleted: PropTypes.string,
    mediaID: PropTypes.number
  }).isRequired,
  removeFromList: PropTypes.func
};
