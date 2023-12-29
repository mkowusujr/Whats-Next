import { useState } from 'react';
import { addProgress } from '../../services/progress.service';

export default function AddProjectItem(props) {
  const [current, setCurrent] = useState('');
  const [total, setTotal] = useState('');
  const [unit, setUnit] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const addNewProgress = e => {
    e.preventDefault();

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
        setProgress({ ...emptyFields });
      })
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

  const unitInput = (
    <input
      name="unit"
      type="text"
      value={unit}
      onChange={e => setUnit(e.target.value)}
      required
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
      <form onSubmit={addNewProgress}>
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
                <input type="submit" value="Submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
