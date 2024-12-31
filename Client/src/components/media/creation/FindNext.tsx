import ExternalMediaPreview from '@/components/media/cards/ExternalMediaCards';
import SearchInput from '@/components/shared/SearchInput';
import Select from '@/components/shared/Select';
import { searchExternally } from '@/lib/data/media';
import { externalMediaTypes } from '@/lib/utils/form-utils';
import React, { useState } from 'react';

type Props = {};

export default function FindNext({}: Props) {
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
    <div className="flex flex-col gap-8 p-8">
      <form
        className="bg-base-300 flex h-fit flex-col gap-4 rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-primary text-center text-3xl">Find Next</h2>
        <div className="flex justify-between gap-4 items-center">
          <Select
            options={externalMediaTypes}
            value={mediaType}
            onValueChange={value => setMediaType(value!)}
            placeholder=''
          />
          <SearchInput value={query} handleOnChange={(e) => setQuery(e.target.value)} handleReset={()=>setQuery("")}/>
        </div>
      </form>
      {mediaList && (
        <div>
          <h2 className="mb-4 text-center text-3xl">Results</h2>
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
