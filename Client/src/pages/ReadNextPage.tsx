import { useEffect } from 'react';
import { bookTypes } from '@/lib/form-fields';
import ListPage from '@/components/common/ListPage';

/**
 * Functional component for the Read Next page, displaying a list of
 * readable media items.
 */
export default function ReadNextPage() {
  const mediaTypes = bookTypes.map(i => i.label);

  useEffect(() => {
    document.title = 'Read Next?';
  }, []);

  return <ListPage mediaTypes={mediaTypes} pageName={'Read'} />;
}
