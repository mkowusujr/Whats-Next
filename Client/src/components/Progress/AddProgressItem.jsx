import { useState } from 'react';

import { PropTypes } from 'prop-types';

import {
  bookProgressUnits,
  bookTypes,
  mediaProgressUnits,
  videoMediaTypes
} from '../utils/FormFields';
import Select from '../utils/Select';
import { apiToast } from '../../services/api-base.service';
import { addProgress } from '../../services/progress.service';

/**
 * Component for adding progress tracking information for a media item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.mediaID - The ID of the media item being tracked.
 * @param {function} props.addToList - Function to add the new progress to the list.
 * @param {string} props.mediaType - The type of media (e.g., book, video) being tracked.
 * @returns {JSX.Element} - The rendered AddProjectItem component.
 */
export default function AddProjectItem({ mediaID, addToList, mediaType }) {
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

AddProjectItem.propTypes = {
  mediaID: PropTypes.number.isRequired,
  addToList: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired
};
