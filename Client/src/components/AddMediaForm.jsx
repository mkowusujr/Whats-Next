import { useState } from "react";
import { addMedia } from "../services/media.service";
import { watchStatuses, ratings } from "./FormFields";
import "../sass/AddMediaForm.scss";

export default function AddMediaForm(props) {
  const [name, setName] = useState("");
  const [watchStatus, setWatchStatus] = useState("");
  const [personalRating, setPersonalRating] = useState(ratings[0]);
  const [dateStarted, setDateStarted] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");

  const submitEntry = (e) => {
    e.preventDefault();
    const media = {
      name: name,
      watchStatus: watchStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
    };
    addMedia(media)
      .then(() => {
        props.updateMediaList();
        setName("");
        setWatchStatus("");
        setPersonalRating(ratings[0]);
        setDateStarted("");
        setDateCompleted("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="add-media-form">
      <form onSubmit={submitEntry}>
        <table>
          <thead>
            <tr>
              <td colSpan={2}>Add Media</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Watch Status</label>
              </td>
              <td>
                <select
                  value={watchStatus}
                  onChange={(e) => setWatchStatus(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Watch Status
                  </option>
                  {watchStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Personal Rating</label>
              </td>
              <td>
                <select
                  value={personalRating}
                  onChange={(e) => setPersonalRating(e.target.value)}
                >
                  {ratings.map((rating, index) => (
                    <option key={index} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Date Started</label>
              </td>
              <td>
                <input
                  type="date"
                  value={dateStarted}
                  onChange={(e) => setDateStarted(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Date Completed</label>
              </td>
              <td>
                <input
                  type="date"
                  value={dateCompleted}
                  onChange={(e) => setDateCompleted(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <input type="submit" value="Add Media" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
