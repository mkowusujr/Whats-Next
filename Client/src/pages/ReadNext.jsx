import MediaList from '../components/media/MediaList';
import { bookTypes } from '../components/utils/FormFields';

export default function ReadNextPage() {
  return <MediaList mediaTypes={bookTypes} />;
}
