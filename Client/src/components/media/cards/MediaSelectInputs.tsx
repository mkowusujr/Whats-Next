import Select from '@/components/shared/Select';
import { scores, statuses } from '@/lib/utils/form-utils';

type SelectMediaStatusProps = {
  status: string | null;
  onChange: (e: string | null) => void;
  required?: boolean;
};
export const SelectMediaStatus = ({
  status,
  onChange,
  required = false
}: SelectMediaStatusProps) => (
  <Select
    value={status ?? undefined}
    options={statuses}
    onValueChange={value => onChange(value)}
    placeholder={'Set Status'}
    required={required}
  />
);

type SelectMediaScoreProps = {
  score: number | null;
  onChange: (e: string | null) => void;
  required?: boolean;
};
export const SelectMediaScore = ({
  score,
  onChange,
  required = false
}: SelectMediaScoreProps) => (
  <Select
    value={score ? score.toString() : undefined}
    options={scores}
    onValueChange={value => onChange(value)}
    placeholder={'Set Score'}
    required={required}
  />
);
