import { ChangeEvent, useState } from 'react';
import { videoMediaTypes, bookTypes } from '@/lib/utils/form-utils';
import Select from '@/components/shared/Select';
import {
  SelectMediaScore,
  SelectMediaStatus
} from '../cards/MediaSelectInputs';
import { addMedia } from '@/lib/data/media';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WATCH_NEXT_FILTER, READ_NEXT_FILTER } from '@/lib/utils';
import DateInput from '@/components/shared/DateInput';
import TextInput from '@/components/shared/TextInput';

type AddMediaProps = {};

/** Functional component for adding new media items. */
export default function AddMediaManual({}: AddMediaProps) {
  // State variables for form inputs
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [subTitle, setSubTitle] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [score, setScore] = useState<number | null>(0);
  const [status, setStatus] = useState<string | null>(null);
  const [mediaLink, setMediaLink] = useState<string | undefined>(undefined);
  const [imgLink, setImgLink] = useState<string | undefined>(undefined);
  const [creator, setCreator] = useState<string | undefined>(undefined);
  const [releaseDate, setReleaseDate] = useState<string | undefined>(undefined);
  const [dateStarted, setDateStarted] = useState<string | undefined>(undefined);
  const [dateCompleted, setDateCompleted] = useState<string | undefined>(
    undefined
  );

  // Options for the media type dropdown
  let allowedMediaOptions: { label: string; value: string }[] = [
    ...videoMediaTypes,
    ...bookTypes
  ];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (createdMedia: CreatedMedia) => addMedia(createdMedia),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          `${WATCH_NEXT_FILTER.join('')}-media`,
          `${READ_NEXT_FILTER.join('')}-media`
        ]
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMedia: CreatedMedia = {
      title: title!,
      subTitle: subTitle!,
      mediaType: mediaType!,
      score: score!,
      status: status!,
      mediaLink: mediaLink,
      duration: duration,
      releaseDate: releaseDate,
      imgLink: imgLink,
      creator: creator,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted
    };

    await mutation
      .mutateAsync(newMedia)
      .then(m => {
        setTitle('');
        setSubTitle('');
        setMediaType('');
        setScore(null);
        setStatus('');
        setMediaLink('');
        setCreator('');
        setImgLink('');
        setReleaseDate('');
        setDateStarted('');
        setDateCompleted('');
        setDuration('');
      })
      .catch(err => {});
  };

  return (
    <form
      className="flex flex-col justify-between gap-4 rounded-md p-6 text-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row">
        <TextInput
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add Title"
          className="rounded-t-md"
          required
        />
        <TextInput
          name="subTitle"
          value={subTitle}
          onChange={e => setSubTitle(e.target.value)}
          placeholder="Add Subtitle"
          className="rounded-b-md"
        />
      </div>
      <div className="w-full">
        <TextInput
          name="creator"
          value={creator}
          onChange={e => setCreator(e.target.value)}
          placeholder="Add Creator"
        />
      </div>
      <div className="w-full">
        <TextInput
          name="duration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          placeholder="Duration"
        />
      </div>
      <div className="mx-auto flex flex-col gap-4 md:flex-row">
        <Select
          value={mediaType}
          options={allowedMediaOptions}
          onValueChange={value => setMediaType(value!)}
          placeholder={'Set Media Type'}
          required
        />
      </div>
      <div className="mx-auto flex gap-4 md:flex-row">
        <SelectMediaScore
          score={score}
          onChange={val => setScore(Number(val))}
        />
        <SelectMediaStatus status={status} onChange={val => setStatus(val)} />
      </div>
      <div>
        <DateInput
          label="Release Date"
          name="releaseDate"
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <DateInput
          label="Date Started"
          name="dateStarted"
          value={dateStarted}
          onChange={e => setDateStarted(e.target.value)}
        />
        <DateInput
          label="Date Completed"
          name="dateCompleted"
          value={dateCompleted}
          onChange={e => setDateCompleted(e.target.value)}
        />
      </div>
      <div className="w-full">
        <TextInput
          name="title"
          value={mediaLink}
          onChange={e => setMediaLink(e.target.value)}
          placeholder="Add Link"
        />
      </div>
      <div className="w-full">
        <TextInput
          name="imgLink"
          value={imgLink}
          onChange={e => setImgLink(e.target.value)}
          placeholder="Add Image Link"
        />
      </div>
      <input
        type="submit"
        value="Add Media"
        className="cursor-pointer rounded-md bg-solid-900 px-4 py-1 text-interactive-300 outline-none"
      />
    </form>
  );
}
