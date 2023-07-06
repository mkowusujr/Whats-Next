import { useState } from 'react';
import { readingStatuses, ratings } from '../utils/FormFields';
import '../../sass/media/AddMediaForm.scss';
import { addBook } from '../../services/book.service';

export default function AddBookForm(props) {
  const [isbn, setIsbn] = useState('');
  const [readingStatus, setReadingStatus] = useState('');
  const [personalRating, setPersonalRating] = useState(ratings[0]);
  const [dateStarted, setDateStarted] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');

  const submitEntry = e => {
    e.preventDefault();
    const book = {
      isbn: isbn,
      readingStatus: readingStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted
    };
    addBook(book)
      .then(() => {
        props.updateBookList();
        setIsbn('');
        setReadingStatus('');
        setPersonalRating(ratings[0]);
        setDateStarted('');
        setDateCompleted('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="add-media-form">
      <form onSubmit={submitEntry}>
        <div className="quick-add">
          <input
            type="number"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            required
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
