import { useEffect } from 'react';

import { bookTypes } from '../components/common/FormFields';
import ListPage from '../components/common/ListPage';
import '../sass/pages.scss';

/**
 * Functional component for the Read Next page, displaying a list of readable media items.
 *
 * @returns {JSX.Element} - The rendered ReadNextPage component.
 */
export default function ReadNextPage() {
  const mediaTypes = bookTypes.map(i => i.label);

  useEffect(() => { document.title = "Read Next?" }, [])

  return <ListPage mediaTypes={mediaTypes} pageName={'Read'} />;
}
