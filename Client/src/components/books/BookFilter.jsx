import { useState, useEffect } from 'react';
import { sortByOptions, readingStatuses } from '../utils/FormFields';
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

  return (
    <div className="filter">
      <table>
        <thead>
          <tr>
            <td colSpan={2}>Filters</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>Sort By Property</label>
            </td>
            <td style={{ width: `auto` }}>
              <div className="sorting">
                <select
                  value={sortByProp}
                  onChange={e => setSortByProp(e.target.value)}
                >
                  {Object.values(sortByOptions).map((o, key) => (
                    <option key={key} value={o.label}>
                      {o.label}
                    </option>
                  ))}
                </select>
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
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label>Show Reading Status</label>
            </td>
            <td>
              <select
                value={readingStatus}
                onChange={e => setReadingStatus(e.target.value)}
              >
                {readingStatuses.map((s, key) => (
                  <option key={key} value={s}>
                    {s == '' ? 'Show All' : s}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Book Type</label>
            </td>
            <td>
              <select
                value={bookType}
                onChange={e => setBookType(e.target.value)}
              >
                {[''].map((m, key) => (
                  <option key={key} value={m}>
                    {m == '' ? 'Show All' : m}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
