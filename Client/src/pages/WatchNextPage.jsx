import { lazy, Suspense, useEffect } from 'react';

import { videoMediaTypes } from '../lib/form-fields';
import '../sass/pages.scss';

/**
 * Functional component for the Watch Next page, displaying a list of watchable media items.
 *
 * @returns {JSX.Element} - The rendered WatchNextPage component.
 */
export default function WatchNextPage() {
  const mediaTypes = videoMediaTypes.map(i => i.label);
  const ListPage = lazy(() => import('../components/common/ListPage'));
  useEffect(() => {
    document.title = 'Watch Next?';
  }, []);

  return (
    <Suspense>
      <ListPage mediaTypes={mediaTypes} pageName={'Watch'} />;
    </Suspense>
  );
}
