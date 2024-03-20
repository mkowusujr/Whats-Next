import Select from '@/components/common/Select';
import { scores, statuses } from '@/lib/form-fields';
import { SetStateAction } from 'react';

type SelectMediaStatusProps = {
  status: string;
  setStatus: React.Dispatch<SetStateAction<string>>;
  className?: string;
};
export const SelectMediaStatus = ({
  status,
  setStatus,
  className
}: SelectMediaStatusProps) => (
  <Select
    name={'status'}
    value={status}
    options={statuses}
    className={className}
    onChange={(e: { target: { value: SetStateAction<string> } }) =>
      setStatus(e.target.value)
    }
  />
);

type SelectMediaScoreProps = {
  score: number;
  setScore: React.Dispatch<SetStateAction<number>>;
  className?: string;
};
export const SelectMediaScore = ({
  score,
  setScore,
  className
}: SelectMediaScoreProps) => (
  <Select
    name={'score'}
    value={score}
    options={scores}
    className={className}
    onChange={(e: { target: { value: SetStateAction<number> } }) =>
      setScore(e.target.value)
    }
  />
);
