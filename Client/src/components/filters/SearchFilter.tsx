import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useDebounceCallback } from 'usehooks-ts';

export default function SearchFilter() {
  const [query, setQuery] = useQueryParam('query', StringParam);
  const [value, setValue] = useState(query ?? '');
  const debounced = useDebounceCallback(setQuery, 500);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    debounced(value);
  };

  const handleReset = () => {
    setQuery(null);
    setValue('');
  };

  return (
    <label className="input input-bordered flex items-center gap-2">
      <MagnifyingGlassIcon className="size-5" />
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={value}
        onChange={handleOnChange}
      />
      <XIcon
        className="size-5 cursor-pointer justify-end"
        onClick={handleReset}
      />
    </label>
  );
}
