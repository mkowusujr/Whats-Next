import MediaItem from './MediaItem';

export default function MediaList(props) {
  const mediaItems = props.mediaList.map(m => (
    <MediaItem
      key={m.id}
      media={m}
      removeFromList={props.removeFromList}
      updateList={props.updateList}
    />
  ));

  return (
    <>
      <h2>Items</h2>
      <table>
        <tbody className="media-list">{mediaItems}</tbody>
      </table>
    </>
  );
}
