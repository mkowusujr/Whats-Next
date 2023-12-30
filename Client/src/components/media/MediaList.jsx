import MediaItem from './MediaItem';

export default function MediaList(props) {
  const mediaItems = props.mediaList.map(m => (
    <MediaItem key={m.id} media={m} />
  ));

  return (
    <table>
      <tbody className="media-list">{mediaItems}</tbody>
    </table>
  );
}
