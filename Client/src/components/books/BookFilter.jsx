import { useState, useEffect } from 'react';
import { sortByOptions, readingStatuses, bookTypes } from '../utils/FormFields';
import '../../sass/media/Filter.scss';

export default function BookFilter(props) {
  const { filters, setFilters } = props.filterProps;

  const [sortByProp, setSortByProp] = useState(filters.sortBy.prop);
  const [sortByDesc, setSortByDesc] = useState(filters.sortBy.desc);
  const [bookType, setBookType] = useState(filters.mediaType);
  const [readingStatus, setReadingStatus] = useState(filters.readingStatus);

  const saveFilterSettings = filters => {
    localStorage.setItem('bookFilters', JSON.stringify(filters));
  };

  const updateFilters = () => {
    const updatedFilters = {
      sortBy: { prop: sortByProp, desc: sortByDesc },
      bookType: bookType,
      readingStatus: readingStatus
    };

    setFilters(updatedFilters);
    saveFilterSettings(updatedFilters);
  };

  useEffect(() => {
    updateFilters();
  }, [sortByProp, sortByDesc, bookType, readingStatus]);

  const bookTypeSelect = (
    <select value={bookType} onChange={e => setBookType(e.target.value)}>
      {['', ...bookTypes].map((m, key) => (
        <option key={key} value={m}>
          {m == '' ? 'Any' : m}
        </option>
      ))}
    </select>
  );

  const readingStatusSelect = (
    <select
      value={readingStatus}
      onChange={e => setReadingStatus(e.target.value)}
    >
      {['', ...readingStatuses.slice(1)].map((s, key) => (
        <option key={key} value={s}>
          {s == '' ? 'Any' : s}
        </option>
      ))}
    </select>
  );

  let bookSortByOptions = sortByOptions;
  delete bookSortByOptions.name;

  const sortByPropSelect = (
    <select value={sortByProp} onChange={e => setSortByProp(e.target.value)}>
      {Object.values(bookSortByOptions).map((o, key) => (
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
      {bookTypeSelect}
      <span>WITH STATUS</span>
      {readingStatusSelect}
      <span>SORTING BY</span>
      {sortByPropSelect}
      {orderingSelect}
    </div>
  );
}
