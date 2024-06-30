import { updateProgress } from '@/lib/data/progress';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { SelectMediaScore, SelectMediaStatus } from './MediaSelectInputs';

type MediaCardProgressSectionProps = { progress: Progress };

export default function MediaCardProgressSection({
  progress
}: MediaCardProgressSectionProps) {
  const mutation = useMutation({
    mutationFn: async (progress: Progress) => {
      await updateProgress(progress);
    }
  });

  const [status, setStatus] = useState(progress.status);
  const [score, setScore] = useState(progress.score ?? '');

  return (
    <>
      <SelectMediaScore
        score={score}
        onChange={async e => {
          const newScore = Number(e.target.value);
          setScore(newScore);
          await mutation.mutateAsync({
            ...progress,
            score: newScore
          });
        }}
        className="rounded-sm"
      />
      <SelectMediaStatus
        status={status}
        onChange={async e => {
          const newStatus = e.target.value;
          setStatus(newStatus);
          await mutation.mutateAsync({
            ...progress,
            status: newStatus
          });
        }}
        className="rounded-sm"
      />
    </>
  );
}
