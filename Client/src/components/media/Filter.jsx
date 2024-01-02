import { useEffect, useState } from 'react';

import { scores, sortByOptions, statuses } from '../utils/FormFields';
import Select from '../utils/Select';
import '../../sass/media.scss';

export default function Filter(props) {
  const [name, setName] = useState(props.filters.get.name);
  const [mediaTypes, setMediaTypes] = useState(props.filters.get.mediaTypes);
  const [score, setScore] = useState(props.filters.get.score);
  const [status, setStatus] = useState(props.filters.get.status);
  const [sortBy, setSortBy] = useState(props.filters.get.sortBy);
  const [isAsc, setIsAsc] = useState(props.filters.get.isAsc);

  useEffect(() => {
    props.filters.set({
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
