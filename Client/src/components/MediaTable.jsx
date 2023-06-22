import MediaRow from "./MediaRow";
import "../sass/MediaTable.scss";

export default function MediaTable(props) {
  const mediaList = props.mediaList;
  const show = props.show == null || props.show == "" ? "Show All" : props.show;

  return (
    <div className="media-table">
      <table>
        <thead>
          <tr className="sort-by-prop">
            <td colSpan={3}>{show.toUpperCase()}</td>
          </tr>
        </thead>
        <tbody>
          {mediaList.map((media, index) => (
            <MediaRow
              key={index}
              media={media}
              updateMediaList={props.updateMediaList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
