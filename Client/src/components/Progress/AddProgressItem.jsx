import { useState } from 'react';
import { addProgress } from '../../services/progress.service';
import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '../utils/FormFields';
import Select from '../utils/Select';
import { apiToast } from '../../services/api-base.service';

export default function AddProjectItem(props) {
  const [current, setCurrent] = useState('');
  const [total, setTotal] = useState('');
  const [unit, setUnit] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const progress = {
        current: +current,
        total: +total,
        unit: unit,
        dateStarted: dateStarted,
        dateCompleted: dateCompleted,
        mediaID: +props.mediaID
      };

      addProgress(progress)
        .then(newProgress => {
          props.addToList(newProgress);
          setCurrent('');
          setTotal('');
          setUnit('');
          setDateStarted('');
          setDateCompleted('');
          res('Successfully added progress')
        })
        .catch(err => rej(err));
    })

    apiToast(callAPI)
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
  if (videoMediaTypes.map(i => i.label).includes(props.mediaType)) {
    unitOptions = mediaProgressUnits;
  } else if (bookTypes.map(i => i.label).includes(props.mediaType)) {
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
    <>
      <h3>Track New Progress</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Current</th>
              <th>Total</th>
              <th>Units</th>
              <th>Date Started</th>
              <th>Date Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentInput}</td>
              <td>{totalInput}</td>
              <td>{unitInput}</td>
              <td>{dateStartedtInput}</td>
              <td>{dateCompletedtInput}</td>
              <td>
                <input type="submit" value="Add Progress" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
