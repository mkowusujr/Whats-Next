import Select from '@/components/shared/Select';
import { scores, statuses } from '@/lib/utils/form-utils';

type SelectMediaStatusProps = {
  status: string | null;
  onChange: (e: string | null) => void;
};
export const SelectMediaStatus = ({
  status,
  onChange
}: SelectMediaStatusProps) => (
  <Select
    value={status ?? undefined}
    options={statuses}
    onValueChange={value => onChange(value)}
    placeholder={'Set Status'}
  />
);

type SelectMediaScoreProps = {
  score: number | null;
  onChange: (e: string | null) => void;
};
export const SelectMediaScore = ({
  score,
  onChange
}: SelectMediaScoreProps) => (
  <Select
    value={score ? score.toString() : undefined}
    options={scores}
    onValueChange={value => onChange(value)}
    placeholder={'Set Score'}
  />
);
