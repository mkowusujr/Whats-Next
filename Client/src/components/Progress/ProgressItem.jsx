import { useState } from 'react';
import {
  deleteProgress,
  updateProgress
} from '../../services/progress.service';
import useSubsequentEffect from '../utils/useSubsequentEffect';
import Select from '../utils/Select';
import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '../utils/FormFields';

export default function ProgressItem(props) {
  const progress = props.progress;
  const [current, setCurrent] = useState(progress.current);
  const [total, setTotal] = useState(progress.total);
  const [unit, setUnit] = useState(progress.unit);
  const [dateStarted, setDateStarted] = useState(progress.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(progress.dateCompleted);

  useSubsequentEffect(() => {
    const updatedProgress = {
      current: +current,
      total: +total,
      unit: unit,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
      mediaID: +progress.mediaID
    };

    updateProgress(updatedProgress).catch(err => console.error(err));
  }, [current, total, unit, dateStarted, dateCompleted]);

  const deleteProgressTracker = () => {
    deleteProgress(progress.id)
      .then(() => props.removeFromList(progress.id))
      .catch(err => console.error(err));
  };

  const currentInput = (
    <input
      name="current"
      type="number"
      value={current}
      onChange={e => setCurrent(e.target.value)}
      required
    />
  );

  const totalInput = (
    <input
      name="total"
      type="number"
      value={total}
      onChange={e => setTotal(e.target.value)}
      required
    />
  );

  let unitOptions = [];
  if (videoMediaTypes.includes(props.mediaType)) {
    unitOptions = mediaProgressUnits;
  } else if (bookTypes.includes(props.mediaType)) {
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

  const deleteBtn = (
    <button onClick={deleteProgressTracker}>Delete Progress</button>
  );

  return (
    <tr>
      <td>{currentInput}</td>
      <td>{totalInput}</td>
      <td>{unitInput}</td>
      <td>{dateStartedtInput}</td>
      <td>{dateCompletedtInput}</td>
      <td>{deleteBtn}</td>
    </tr>
  );
}
