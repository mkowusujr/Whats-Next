import { useState } from 'react';
import { addMedia } from '../../services/media.service';
import { watchStatuses, ratings } from '../utils/FormFields';
import toast from 'react-hot-toast';
import '../../sass/media/AddMediaForm.scss';

export default function AddMediaForm(props) {
  const [name, setName] = useState('');
  const [watchStatus, setWatchStatus] = useState('');
  const [personalRating, setPersonalRating] = useState(ratings[0]);
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const submitEntry = e => {
    e.preventDefault();
    const media = {
      name: name,
      watchStatus: watchStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted
    };

    const add = new Promise((res, rej) => {
      addMedia(media)
        .then(media => {
          props.addItemToList(media);
          setName('');
          setWatchStatus('');
          setPersonalRating(ratings[0]);
          setDateStarted('');
          setDateCompleted('');
          res();
        })
        .catch(err => rej(err));
    });

    toast.promise(
      add,
      {
        loading: 'Loading...',
        success: () => `Successfully added ${media.name}`,
        error: err => `This just happened: ${err.toString()}`
      },
      {
        success: {
          duration: 3000,
          icon: '🔥'
        }
      }
    );
  };

  return (
    <div className="add-media-form">
      <form onSubmit={submitEntry}>
        <div className="quick-add">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Add Media Name & Year"
            required
          />
          <select
            value={watchStatus}
            onChange={e => setWatchStatus(e.target.value)}
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
          <input type="submit" value="Add Media" />
        </div>
        <details>
          <summary>Expand</summary>
          <div className="expanded-options">
            <label>
              Personal Rating
              <select
                value={personalRating}
                onChange={e => setPersonalRating(e.target.value)}
              >
                {ratings.map((rating, index) => (
                  <option key={index} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </label>
            <div className="expanded-dates">
              <label>
                Date Started
                <input
                  type="date"
                  value={dateStarted}
                  onChange={e => setDateStarted(e.target.value)}
                />
              </label>
              <label>
                Date Completed
                <input
                  type="date"
                  value={dateCompleted}
                  onChange={e => setDateCompleted(e.target.value)}
                />
              </label>
            </div>
          </div>
        </details>
      </form>
    </div>
  );
}
