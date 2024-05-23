import ScoreFilterSelector from '@/components/filters/ScoreFilterSelector';
import SearchFilter from '@/components/filters/SearchFilter';
import SortByFilterSelector from '@/components/filters/SortByFilterSelector';
import StatusFilterSelector from '@/components/filters/StatusFilterSelector';
import { listInternalMedia } from '@/lib/data/media';
import { useFilterQueryParams } from '@/lib/hooks/useFilterQueryParams';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function MediaPage() {
  const searchParams = useFilterQueryParams();

  const { ref, inView } = useInView();
  const {
    isPending,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams],
    queryFn: page => listInternalMedia(page, searchParams, []),
    staleTime: 1,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.nextCursor;
    }
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  const posts = data ? data.pages.flatMap(page => page?.media) : [];

  return (
    <div className="flex flex-col">
      <div className="flex">
        <h1>What's Next</h1>
        <div className="flex">
          <button>Card</button>
          <button>List</button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <SortByFilterSelector />
          <ScoreFilterSelector />
          <StatusFilterSelector />
        </div>
        <SearchFilter />
      </div>
      <div>
        <h1 className="my-8 text-center text-3xl font-bold text-gray-400">
          Posts Data
        </h1>
        <div>
          {posts.map(post => {
            return (
              <Link
                to={`${post?.id}`}
                key={post?.id}
                className="my-6 block cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-900"
              >
                <h2 className="mb-2 text-lg font-bold text-gray-400">
                  {post?.title}
                </h2>
                <p className="text-gray-400">{post?.summary}</p>
              </Link>
            );
          })}
        </div>
        {hasNextPage && <div ref={ref} className="h-4 w-full"></div>}
      </div>
    </div>
  );
}

const getPosts = async (page: { pageParam: any }, searchParams: string) => {
  console.log(page);
  const res = await fetch(
    `http://localhost:3000/media/internal?cursor=${page.pageParam}&take=10&${searchParams}`
  );
  if (!res.ok) {
    throw new Error('There was an error!');
  }
  return res.json();
};
