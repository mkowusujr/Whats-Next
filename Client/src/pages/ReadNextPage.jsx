import { bookTypes } from '../components/utils/FormFields';
import ListPage from '../components/utils/ListPage';
import '../sass/pages.scss';

/**
 * Functional component for the Read Next page, displaying a list of readable media items.
 *
 * @returns {JSX.Element} - The rendered ReadNextPage component.
 */
export default function ReadNextPage() {
  const mediaTypes = bookTypes.map(i => i.label);

  return <ListPage mediaTypes={mediaTypes} pageName={'Read'} />;
}
