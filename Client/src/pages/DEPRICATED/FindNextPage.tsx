import Select from '@/components/DEPRICATED/common/Select';
import ExternalMediaPreview from '@/components/media/ExternalMediaPreview';
import { searchExternally } from '@/lib/data/external-media';
import { searchGbooks } from '@/lib/data/media';
import { externalMediaTypes } from '@/lib/form-fields';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function FindNextPage({}: Props) {
  const [mediaList, setMediaList] = useState<ExternalMedia[] | null>(null);
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState(externalMediaTypes[0].value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await searchExternally(query, mediaType);
      setMediaList(results!);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 text-white">
      <form
        className="flex h-fit flex-col gap-4 rounded-md bg-base-300 p-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl text-primary">Find Next</h2>
        <div className="flex flex-col gap-8 text-lg md:flex-row">
          <Select
            name={'mediaType'}
            options={externalMediaTypes}
            value={mediaType}
            onChange={e => setMediaType(e.target.value)}
          />
          <input
            className="w-full rounded-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for Media Externally"
            required
          />
          <input
            className="rounded-md bg-primary px-4"
            type="submit"
            value="Search"
          />
        </div>
      </form>
      {mediaList && (
        <div>
          <h2 className="mb-4 text-center text-3xl text-primary">Results</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mediaList.map((media, index) => (
              <ExternalMediaPreview media={media} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
