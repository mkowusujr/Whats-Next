import { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';

import { scores, sortByOptions, statuses } from '../utils/FormFields';
import Select from '../utils/Select';
import '../../sass/media.scss';

/**
 * Functional component for filtering media items.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.filters - Object containing filter parameters (get and set).
 * @param {Object} props.filters.get - Object representing the current filter values.
 * @param {string} props.filters.get.name - The name filter.
 * @param {Array} props.filters.get.mediaTypes - The media types filter.
 * @param {number} props.filters.get.score - The score filter.
 * @param {string} props.filters.get.status - The status filter.
 * @param {string} props.filters.get.sortBy - The sorting parameter.
 * @param {boolean} props.filters.get.isAsc - The sorting order (true for ascending, false for descending).
 * @param {function} props.filters.set - Function to update filter parameters.
 * @returns {JSX.Element} - The rendered Filter component.
 */
export default function Filter({ filters }) {
  // State variables for filter inputs
  const [name, setName] = useState(filters.get.name);
  const [mediaTypes, setMediaTypes] = useState(filters.get.mediaTypes);
  const [score, setScore] = useState(filters.get.score);
  const [status, setStatus] = useState(filters.get.status);
  const [sortBy, setSortBy] = useState(filters.get.sortBy);
  const [isAsc, setIsAsc] = useState(filters.get.isAsc);

  // Effect to update filters when filter inputs change
  useEffect(() => {
    filters.set({
      name: name,
      mediaTypes: mediaTypes,
      score: [score],
      status: status,
      sortBy: sortBy,
      isAsc: isAsc
    });
  }, [name, mediaTypes, score, status, sortBy, isAsc]);

  return (
    <div className="filter">
      <div className="filter-data">
        <div className="filter-group">
          <input
            className="filter-search"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Search Items"
          />
        </div>
        <div className="filter-group">
          <Select
            label={'Score: '}
            name={'score'}
            value={score}
            options={scores}
            onChange={e => setScore(+e.target.value)}
          />
          <Select
            label={'Status: '}
            name={'status'}
            value={status}
            options={statuses}
            onChange={e => setStatus(e.target.value)}
          />
          <Select
            label={'Sort By: '}
            name={'sortBy'}
            value={sortBy}
            options={sortByOptions}
            onChange={e => {
              setSortBy(e.target.value);
              setIsAsc(['Name'].includes(e.target.value));
            }}
          />
          <label>
            ASC:
            <input
              type="checkbox"
              name="isAsc"
              checked={isAsc}
              onChange={() => setIsAsc(!isAsc)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.shape({
    get: PropTypes.object,
    set: PropTypes.string
  }).isRequired
};
