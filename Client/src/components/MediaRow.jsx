import { useEffect, useState } from "react";
import { watchStatuses, ratings } from "./FormFields";
import { deleteMedia, updateMedia } from "../services/media.service";
import "../sass/MediaRow.scss";

export default function MediaRow(props) {
  const media = props.media;
  const index = props.index;

  const [watchStatus, setWatchStatus] = useState(media.watchStatus);
  const [personalRating, setPersonalRating] = useState(media.personalRating);
  const [dateStarted, setDateStarted] = useState(media.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(media.dateCompleted);

  useEffect(() => {
    updateRow();
  }, [personalRating, watchStatus, dateStarted, dateCompleted]);

  const titleCase = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const toYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.getFullYear();
  };

  const updateRow = () => {
    const updatedMedia = {
      id: media.id,
      watchStatus: watchStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
    };

    updateMedia(updatedMedia)
      .then(() => props.updateMediaList())
      .catch((err) => console.error(err));
  };

  const deleteRow = () => {
    deleteMedia(media)
      .then(() => props.updateMediaList())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <tr
        className="media-row"
        key={index}
        onMouseEnter={() => {
          props.imgUrlUtils.setImgUrl(media.posterImageUrl);
        }}
      >
        <td>
          <img className="poster-image" src={media.posterImageUrl} />
        </td>
        <td className="media-info">
          <div className="media-name">{media.name}</div>
          <div className="media-info-info">
            {titleCase(media.mediaType)} | {toYear(media.releaseDate)} |{" "}
            {media.genres.replaceAll(",", ", ")}
          </div>
          <div className="media-user-info">
            <label>
              Watch Status:
              <select
                value={media.watchStatus}
                onChange={(e) => setWatchStatus(e.target.value)}
              >
                {watchStatuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <div className="media-dates">
              <label>
                Started:
                <input
                  type="date"
                  value={media.dateStarted}
                  onChange={(e) => setDateStarted(e.target.value)}
                />
              </label>
              <label>
                Finished:
                <input
                  type="date"
                  value={media.dateCompleted}
                  onChange={(e) => setDateCompleted(e.target.value)}
                />
              </label>
            </div>

            <label>
              Personal Rating:
              <select
                value={media.personalRating}
                onChange={(e) => setPersonalRating(e.target.value)}
              >
                {ratings.map((rating, index) => (
                  <option key={index} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </td>
        <td>
          <input type="button" onClick={deleteRow} value="Deleted" />
        </td>
      </tr>
    </>
  );
}
