import { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useDebounceCallback } from 'usehooks-ts';
import SearchInput from '../shared/SearchInput';

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
    <SearchInput
      value={value}
      handleOnChange={handleOnChange}
      handleReset={handleReset}
    />
  );
}
