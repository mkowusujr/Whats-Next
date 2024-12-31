import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { useDebounceCallback } from 'usehooks-ts';

type SearchInputProps = {
	value: string
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleReset: () => void;
}

export default function SearchInput({value, handleOnChange, handleReset}:SearchInputProps) {
  return (
    <label className="flex flex-1 items-center gap-2 rounded-md border border-borders-600 bg-interactive-300 p-2">
      <MagnifyingGlassIcon className="size-5 text-solid-900" />
      <input
        type="text"
        className="grow bg-interactive-300 text-solid-900 placeholder:text-solid-900 focus:border-none focus:outline-none focus:ring-0"
        placeholder="Search"
        value={value}
        onChange={handleOnChange}
      />
      <XIcon
        className="size-5 cursor-pointer justify-end text-solid-900 hover:text-solid-1000"
        onClick={handleReset}
      />
    </label>
  );
}