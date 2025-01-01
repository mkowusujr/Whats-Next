import MediaCardGrid from '@/components/media/cards/MediaCardGrid';
import MediaFilters from '@/components/media/MediaFilters';
import MediaTypesProvider from '@/components/media/MediaTypesProvider';
import { listInternalMedia } from '@/lib/data/media';
import { useFilterQueryParams } from '@/lib/hooks/useFilterQueryParams';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type MediaPageProps = {
  mediaTypes: string[];
};

export default function MediaPage({ mediaTypes }: MediaPageProps) {
  const searchParams = useFilterQueryParams();

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`${mediaTypes.join('')}-media`, searchParams],
    queryFn: page => listInternalMedia(page, searchParams, mediaTypes),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.nextCursor;
    }
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const media = data ? data.pages.flatMap(page => page?.media) : [];

  return (
    <div className="flex flex-col p-4">
      <MediaFilters />
      <MediaTypesProvider mediaTypes={mediaTypes}>
      <div className="my-8">
        <MediaCardGrid media={media as Media[]} />
        {hasNextPage && <div ref={ref} className="h-4 w-full"></div>}
      </div>
      </MediaTypesProvider>
    </div>
  );
}
