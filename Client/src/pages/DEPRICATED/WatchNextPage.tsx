import { useEffect } from 'react';
import { videoMediaTypes } from '@/lib/form-fields';
import ListPage from '@/components/DEPRICATED/common/ListPage';

/**
 * Functional component for the Watch Next page, displaying a list of
 * watchable media items.
 */
export default function WatchNextPage() {
  const mediaTypes = videoMediaTypes.map(i => i.label);

  useEffect(() => {
    document.title = 'Watch Next?';
  }, []);

  return <ListPage mediaTypes={mediaTypes} pageName={'Watch'} />;
}
