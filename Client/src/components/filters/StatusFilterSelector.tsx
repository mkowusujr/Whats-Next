import { StringParam, useQueryParam } from 'use-query-params';
import Select from '../shared/Select';
import { SelectOption } from '@/types/filters';

export default function StatusFilterSelector() {
  const [status, setStatus] = useQueryParam('status', StringParam);
  return (
    <Select
      value={status ?? ''}
      onValueChange={value => setStatus(value)}
      options={sortByOptions}
      placeholder={'Status'}
    />
  );
}

const sortByOptions: SelectOption[] = [
  { label: 'Planned', value: 'Planned' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Dropped', value: 'Dropped' }
];
