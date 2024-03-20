import { useEffect, useState, useRef } from 'react';
import { scores, sortByOptions, statuses } from '@/lib/form-fields';
import Select from '@/components/common/Select';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/common/Dialog';
import { FunnelIcon } from '@heroicons/react/24/outline';
import Checkbox from '../common/Checkbox';
import { useDebounce } from 'use-debounce';

type FilterProps =
  /** A List containing filter state */
  { filterProps: [Filter, React.Dispatch<React.SetStateAction<Filter>>] };
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
  const [debouncedName] = useDebounce(name, 750);

  // Effect to update filters when filter inputs change
  useEffect(() => {
    setFilters({
      name: debouncedName,
      mediaTypes: mediaTypes,
      score: score,
      status: status,
      sortBy: sortBy,
      isAsc: isAsc
    });
  }, [debouncedName, mediaTypes, score, status, sortBy, isAsc]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="align-center fixed bottom-20 left-4 z-30 flex rounded-md bg-accent px-4 py-2 text-2xl font-bold text-neutral opacity-90 shadow-lg">
            <FunnelIcon className="mr-2 size-8" />
            <span>Filters</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-between gap-4 rounded-md bg-base-300 p-6 text-2xl">
            <div className="">
              <input
                autoFocus
                className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Search Items"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Select
                name={'score'}
                value={score}
                options={scores}
                onChange={e => setScore(e.target.value)}
              />
              <Select
                name={'status'}
                value={status}
                options={statuses}
                onChange={e => setStatus(e.target.value)}
              />
              <Select
                name={'sortBy'}
                value={sortBy}
                options={sortByOptions}
                onChange={e => {
                  setSortBy(e.target.value);
                  setIsAsc(['Name'].includes(e.target.value));
                }}
              />
              <Checkbox
                label="ASC"
                isChecked={isAsc}
                handleChange={() => setIsAsc(!isAsc)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
