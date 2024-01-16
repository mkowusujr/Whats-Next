import { useEffect, useState, useRef } from 'react';

import { PropTypes } from 'prop-types';

import { scores, sortByOptions, statuses } from '../common/FormFields';
import Select from '../common/Select';
import "../../sass/filter.scss";

/**
 * Functional component for filtering media items.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.filterProps - A List containing filter state.
 * @returns {JSX.Element} - The rendered Filter component.
 */
export default function Filter({ filterProps }) {
  const [filters, setFilters] = filterProps;
  
  const windowWidth = useRef(window.innerWidth);
  // State variables for filter inputs
  const [name, setName] = useState(filters.name);
  const [mediaTypes, setMediaTypes] = useState(filters.mediaTypes);
  const [score, setScore] = useState(filters.score);
  const [status, setStatus] = useState(filters.status);
  const [sortBy, setSortBy] = useState(filters.sortBy);
  const [isAsc, setIsAsc] = useState(filters.isAsc);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => { 
    setShowFilterOptions(windowWidth.current > 900)
    
  }, [windowWidth])

  // Effect to update filters when filter inputs change
  useEffect(() => {
    setFilters({
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
     
        <div className="filter-group">
          <input
            className="filter-search"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Search Items"
          />
        <button
          className="filter-button"
          onClick={() => setShowFilterOptions(!showFilterOptions)}
        >
              <i className="gg-filters"></i>
              Filters
          </button>
        </div>
      <div className='filter-options-container'
        style={{ display: showFilterOptions ? 'flex' : 'none'}}
      >
        <div className='filter-options'>

          <Select
            // label={'Score: '}
            name={'score'}
            value={score}
            options={scores}
            onChange={e => setScore(+e.target.value)}
          />
          <Select
            // label={'Status: '}
            name={'status'}
            value={status}
            options={statuses}
            onChange={e => setStatus(e.target.value)}
          />
          <Select
            // label={'Sort By: '}
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
  filterProps: PropTypes.array.isRequired
};
