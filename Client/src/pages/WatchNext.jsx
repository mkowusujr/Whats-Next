import MediaList from '../components/media/MediaList';

export default function WatchNextPage() {
  const videoMediaTypes = ['Movie', 'Series'];

  return <MediaList mediaTypes={videoMediaTypes} />;
}
