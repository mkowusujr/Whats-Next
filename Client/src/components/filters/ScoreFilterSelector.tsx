import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import Select from '../shared/Select';
import { SelectOption } from '@/types/filters';

export default function ScoreFilterSelector() {
  const [score, setScore] = useQueryParam('score', StringParam);
  return (
    <Select
      value={score?.toString() ?? ''}
      onValueChange={value => setScore(value)}
      options={scoreOptions}
      placeholder={'Score'}
      optionLabel={'Options'}
    />
  );
}

const scoreOptions: SelectOption[] = [
  { label: '(10) Masterpiece', value: '10' },
  { label: '(9) Great', value: '9' },
  { label: '(8) Very Good', value: '8' },
  { label: '(7) Good', value: '7' },
  { label: '(6) Fine', value: '6' },
  { label: '(5) Average', value: '5' },
  { label: '(4) Bad', value: '4' },
  { label: '(3) Very Bad', value: '3' },
  { label: '(2) Horrible', value: '2' },
  { label: '(1) Appalling', value: '1' }
];
