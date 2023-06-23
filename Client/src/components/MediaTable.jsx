import MediaRow from "./MediaRow";
import "../sass/MediaTable.scss";
import { usePalette } from "react-palette";

export default function MediaTable(props) {
  const mediaList = props.mediaList;
  const show = props.show == null || props.show == "" ? "Show All" : props.show;
const { data, loading, error } = usePalette(props.imgUrlUtils.imgUrl);
  return (
    <div className="media-table">
      <table
        style={{
          borderColor: data.darkMuted
        }}
      >
        <thead
          style={{
            background: data.darkVibrant,
          }}
        >
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
              imgUrlUtils={props.imgUrlUtils}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
