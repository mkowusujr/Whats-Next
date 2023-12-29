import MediaList from '../components/media/MediaList';

export default function ReadNextPage() {
  const bookTypes = ['Graphic Novels', 'Fiction'];

  return <MediaList mediaTypes={bookTypes} />;
}
