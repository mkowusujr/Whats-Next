import { videoMediaTypes } from '../components/utils/FormFields';
import ListPage from '../components/utils/ListPage';
import '../sass/pages.scss';

/**
 * Functional component for the Watch Next page, displaying a list of watchable media items.
 *
 * @returns {JSX.Element} - The rendered WatchNextPage component.
 */
export default function WatchNextPage() {
  const mediaTypes = videoMediaTypes.map(i => i.label);

  return <ListPage mediaTypes={mediaTypes} pageName={'Watch'} />;
}
