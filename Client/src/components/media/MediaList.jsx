import MediaItem from './MediaItem';
import '../../sass/media.scss';

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
    <div className="media-list">
      <h2 className="title">{props.mediaType} Next </h2>
      <>{props.filterComponent}</>
      <hr className="media-hr"></hr>
      <table>
        <tbody>{mediaItems}</tbody>
      </table>
    </div>
  );
}
