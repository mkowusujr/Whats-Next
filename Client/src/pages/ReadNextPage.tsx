import { Suspense, lazy, useEffect } from 'react';
import { bookTypes } from '../lib/form-fields';
import ListPageSkeleton from '../components/skeletons/ListPageSkeleton';

/**
 * Functional component for the Read Next page, displaying a list of
 * readable media items.
 */
export default function ReadNextPage() {
  const mediaTypes = bookTypes.map(i => i.label);
  const ListPage = lazy(() => import('../components/common/ListPage'));

  useEffect(() => {
    document.title = 'Read Next?';
  }, []);

  return (
    <Suspense fallback={<ListPageSkeleton />}>
      <ListPage mediaTypes={mediaTypes} pageName={'Read'} />
    </Suspense>
  );
}
