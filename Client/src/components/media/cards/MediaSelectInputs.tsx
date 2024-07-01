import Select from '@/components/DEPRICATED/common/Select';
import { scores, statuses } from '@/lib/utils/form-utils';

type SelectMediaStatusProps = {
  status: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};
export const SelectMediaStatus = ({
  status,
  onChange,
  className
}: SelectMediaStatusProps) => (
  <Select
    name={'status'}
    value={status}
    options={statuses}
    className={className}
    onChange={e => onChange(e)}
  />
);

type SelectMediaScoreProps = {
  score: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};
export const SelectMediaScore = ({
  score,
  onChange,
  className
}: SelectMediaScoreProps) => (
  <Select
    name={'score'}
    value={score}
    options={scores}
    className={className}
    onChange={e => onChange(e)}
  />
);
