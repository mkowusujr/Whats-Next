import { useState, useEffect } from 'react';
import { sortByOptions, watchStatuses, mediaTypes } from '../utils/FormFields';
import '../../sass/media/Filter.scss';

export default function MediaFilter(props) {
  const { filters, setFilters } = props.filterProps;

  const [sortByProp, setSortByProp] = useState(filters.sortBy.prop);
  const [sortByDesc, setSortByDesc] = useState(filters.sortBy.desc);
  const [mediaType, setMediaType] = useState(filters.mediaType);
  const [watchStatus, setWatchStatus] = useState(filters.watchStatus);

  const saveFilterSettings = filters => {
    localStorage.setItem('mediaFilters', JSON.stringify(filters));
  };

  const updateFilters = () => {
    const updatedFilters = {
      sortBy: { prop: sortByProp, desc: sortByDesc },
      mediaType: mediaType,
      watchStatus: watchStatus
    };

    setFilters(updatedFilters);
    saveFilterSettings(updatedFilters);
  };

  useEffect(() => {
    updateFilters();
  }, [sortByProp, sortByDesc, mediaType, watchStatus]);

  const mediaTypeSelect = (
    <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
      {mediaTypes.map((m, key) => (
        <option key={key} value={m}>
          {m == '' ? 'Any' : m}
        </option>
      ))}
    </select>
  );

  const watchStatusSelect = (
    <select value={watchStatus} onChange={e => setWatchStatus(e.target.value)}>
      {['', ...watchStatuses.slice(1)].map((s, key) => (
        <option key={key} value={s}>
          {s == '' ? 'Any' : s}
        </option>
      ))}
    </select>
  );

  const sortByPropSelect = (
    <select value={sortByProp} onChange={e => setSortByProp(e.target.value)}>
      {Object.values(sortByOptions).map((o, key) => (
        <option key={key} value={o.label}>
          {o.label}
        </option>
      ))}
    </select>
  );

  const orderingSelect = (
    <>
      <label>
        <input
          type="checkbox"
          checked={sortByDesc == false}
          onChange={() => setSortByDesc(false)}
        />
        ASC
      </label>
      <label>
        <input
          type="checkbox"
          checked={sortByDesc == true}
          onChange={() => setSortByDesc(true)}
        />
        DESC
      </label>
    </>
  );

  return (
    <div className="filter">
      <span>SHOWING</span>
      {mediaTypeSelect}
      <span>WITH STATUS</span>
      {watchStatusSelect}
      <span>SORTING BY</span>
      {sortByPropSelect}
      {orderingSelect}
    </div>
  );
}
