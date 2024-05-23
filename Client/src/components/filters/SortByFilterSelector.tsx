import { StringParam, useQueryParam } from 'use-query-params';
import Select from '../shared/Select';
import { SelectOption } from '@/types/filters';

export default function SortByFilterSelector() {
  const [sortBy, setSortBy] = useQueryParam('sort', StringParam);
  return (
    <Select
      value={sortBy ?? ''}
      onValueChange={value => setSortBy(value)}
      options={sortByOptions}
      placeholder={'Sort By'}
    />
  );
}

const sortByOptions: SelectOption[] = [
  { label: 'Title', value: 'title' },
  { label: 'Added Date', value: 'createdAt' },
  { label: 'Release Date', value: 'releaseDate' },
  { label: 'Score', value: 'score' }
];
