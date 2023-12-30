import MediaList from '../components/media/MediaList';
import { videoMediaTypes } from '../components/utils/FormFields';

export default function WatchNextPage() {
  return <MediaList mediaTypes={videoMediaTypes} />;
}
