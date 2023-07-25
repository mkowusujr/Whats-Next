import { useState } from 'react';
import { readingStatuses, ratings } from '../utils/FormFields';
import '../../sass/media/AddMediaForm.scss';
import { addBook } from '../../services/book.service';
import toast from 'react-hot-toast';

export default function AddBookForm(props) {
  const [title, setTitle] = useState('');
  const [readingStatus, setReadingStatus] = useState('');
  const [personalRating, setPersonalRating] = useState(ratings[0]);
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const submitEntry = e => {
    e.preventDefault();
    const book = {
      title: title,
      isbn: '',
      readingStatus: readingStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted
    };

    const add = new Promise((res, rej) => {
      addBook(book)
        .then(book => {
          props.addItemToList(book);
          setTitle('');
          setReadingStatus('');
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
        success: () => `Successfully added ${book.title}`,
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
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter Title"
            // required
          />
          <select
            value={readingStatus}
            onChange={e => setReadingStatus(e.target.value)}
            required
          >
            {readingStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input type="submit" value="Add Book" />
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
