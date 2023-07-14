import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toYear } from '../utils/utils';
import { deleteBook, updateBook } from '../../services/book.service';
import { readingStatuses, ownershipOptions } from '../utils/FormFields';
import { PersonalRatingSelect } from '../utils/PersonalRatingSelect';
import DialogComponent from '../utils/DialogComponent';
import Notes from '../notes/Notes';
import BookDetails from './BookDetails';
import '../../sass/media/MediaRow.scss';

export default function BookRow(props) {
  const item = props.item;
  const [readingStatus, setReadingStatus] = useState(item.readingStatus);
  const [personalRating, setPersonalRating] = useState(item.personalRating);
  const [dateStarted, setDateStarted] = useState(item.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(item.dateCompleted);
  const [ownershipStatus, setOwnershipStatus] = useState(item.ownershipStatus);

  useEffect(() => {
    updateRow();
  }, [
    personalRating,
    readingStatus,
    dateStarted,
    dateCompleted,
    ownershipStatus
  ]);

  const updateRow = () => {
    const updatedBook = {
      id: item.id,
      readingStatus: readingStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
      ownershipStatus: ownershipStatus
    };

    updateBook(updatedBook)
      .then(() => props.updateCategoryList())
      .catch(err => console.error(err));
  };

  const deleteRow = () => {
    deleteBook(item.id)
      .then(() => {
        props.setSelectedItem(null);
        props.updateCategoryList();
      })
      .catch(err => console.error(err));
  };

  const preloadImage = url => (document.createElement('img').src = url);
  preloadImage(item.imageUrl);

  const ReadingStatusSelect = (
    <select
      value={readingStatus}
      onChange={e => setReadingStatus(e.target.value)}
    >
      {readingStatuses.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  const yearStr =
    item.categories === '[]' ? '' : ` | ${JSON.parse(item.categories)}`;

  const titleStr = `${item.title}${item.subtitle ? `: ${item.subtitle}` : ''}`;

  const DefaultBookRow = (
    <tr
      className="media-row-dafault"
      onClick={() => {
        props.imgUrlUtils.setImgUrl(item.imageUrl);
        props.setSelectedItem(item);
      }}
    >
      <td>
        <LazyLoadImage src={item.imageUrl} width={130} />
      </td>
      <td className="media-info">
        <div className="media-name">
          <p>{titleStr}</p>
          <select
            value={ownershipStatus ?? ownershipOptions[0]}
            onChange={e => setOwnershipStatus(e.target.value)}
          >
            {ownershipOptions.map((o, key) => (
              <option key={key} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="media-info-info">
          <span>
            {toYear(item.publishedDate)}
            {yearStr}
          </span>
          <span></span>
        </div>
        <div className="media-user-info">
          <label>
            Watch Status:
            {ReadingStatusSelect}
          </label>
          <div className="media-dates">
            <label className="start-date">
              Started:
              <input
                type="date"
                value={dateStarted}
                onChange={e => setDateStarted(e.target.value)}
              />
            </label>
            <label>
              Finished:
              <input
                type="date"
                value={dateCompleted}
                onChange={e => setDateCompleted(e.target.value)}
              />
            </label>
          </div>

          <label>
            Personal Rating:
            <PersonalRatingSelect
              personalRating={personalRating}
              setPersonalRating={setPersonalRating}
            />
          </label>
        </div>
      </td>
      <td>
        <div className="media-options">
          <Notes bookID={item.id} />
          <input type="button" onClick={deleteRow} value="Delete" />
        </div>
      </td>
    </tr>
  );

  const MobileBookRow = (
    <tr className="media-row-mobile">
      <td className="col-1">
        <span className="text">{titleStr}</span>
      </td>
      <td colSpan={2}>
        <span className="media-info-mobile">
          {`${toYear(item.publishedDate)} ${JSON.parse(item.categories)}`}
        </span>
        <span>{ReadingStatusSelect}</span>
        <span>
          {
            <PersonalRatingSelect
              personalRating={personalRating}
              setPersonalRating={setPersonalRating}
            />
          }
        </span>
        <DialogComponent
          buttonText="View More"
          cmpnt={<BookDetails book={item} />}
        />
        <DialogComponent buttonText="Edit Details" cmpnt={<></>} />
      </td>
    </tr>
  );

  return (
    <>
      {DefaultBookRow}
      {MobileBookRow}
    </>
  );
}
