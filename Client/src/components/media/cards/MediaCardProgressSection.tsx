import { updateProgress } from '@/lib/data/progress';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SelectMediaScore, SelectMediaStatus } from './MediaSelectInputs';

type MediaCardProgressSectionProps = { progress: Progress };

export default function MediaCardProgressSection({
  progress
}: MediaCardProgressSectionProps) {
  const mutation = useMutation({
    mutationFn: (progress: Progress) => updateProgress(progress)
  });

  const [status, setStatus] = useState<string | null>(progress.status);
  const [score, setScore] = useState<number | null>(progress.score);
  return (
    <>
      <SelectMediaScore
        score={score}
        onChange={async value => {
          const newScore = Number(value);
          setScore(newScore);
          await mutation.mutateAsync({
            ...progress,
            score: newScore
          });
        }}
      />
      <SelectMediaStatus
        status={status}
        onChange={async value => {
          const newStatus = value;
          setStatus(newStatus);
          await mutation.mutateAsync({
            ...progress,
            status: newStatus
          });
        }}
      />
    </>
  );
}
