import { useEffect, useState, useRef } from 'react';
import { scores, sortByOptions, statuses } from '@/lib/form-fields';
import Select from '@/components/common/Select';
import { Dialog, DialogContent, DialogTrigger } from '../common/Dialog';
import { FunnelIcon } from '@heroicons/react/24/outline';

type FilterProps =
  /** A List containing filter state */
  { filterProps: [] };
/** Functional component for filtering media items. */
export default function Filter({ filterProps }: FilterProps) {
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
    setShowFilterOptions(windowWidth.current > 900);
  }, [windowWidth]);

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
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="align-center fixed bottom-20 left-4 z-30 flex rounded-md bg-slate-800/80 px-4 py-2 text-2xl font-bold text-white shadow-lg  backdrop-blur-md">
            <FunnelIcon className="mr-2 size-8" />
            <span>Filters</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-between gap-4 rounded-md bg-white/80 p-6 text-2xl backdrop-blur-sm">
            <div className="">
              <input
                className="w-full p-1 rounded-md"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Search Items"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
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
              <label className='flex'>
                <p>ASC</p>
                <input
                  type="checkbox"
                  name="isAsc"
                  checked={isAsc}
                  onChange={() => setIsAsc(!isAsc)}
                />
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
