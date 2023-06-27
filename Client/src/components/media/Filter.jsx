import { useState, useEffect } from "react";
import { sortByOptions, watchStatuses, mediaTypes } from "./FormFields";
import "../../sass/media/Filter.scss";

export default function Filter(props) {
  const { filters, setFilters } = props.filterProps;

  const [sortByProp, setSortByProp] = useState(filters.sortBy.prop);
  const [sortByDesc, setSortByDesc] = useState(filters.sortBy.desc);
  const [mediaType, setMediaType] = useState(filters.mediaType);
  const [watchStatus, setWatchStatus] = useState(filters.watchStatus);

  const updateFilters = () => {
    const updatedFilters = {
      sortBy: { prop: sortByProp, desc: sortByDesc },
      mediaType: mediaType,
      watchStatus: watchStatus,
    };

    setFilters(updatedFilters);
  };

  useEffect(() => {
    updateFilters();
  }, [sortByProp, sortByDesc, mediaType, watchStatus]);

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
            <td style={{width: `auto`}}>
              <div className="sorting">
                <select
                  value={sortByProp}
                  onChange={(e) => setSortByProp(e.target.value)}
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
              <label>Show Watch Status</label>
            </td>
            <td>
              <select
                value={watchStatus}
                onChange={(e) => setWatchStatus(e.target.value)}
              >
                {["", ...watchStatuses].map((s, key) => (
                  <option key={key} value={s}>
                    {s == "" ? "Show All" : s}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Media Type</label>
            </td>
            <td>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
              >
                {["", ...mediaTypes].map((m, key) => (
                  <option key={key} value={m}>
                    {m == "" ? "Show All" : m}
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
