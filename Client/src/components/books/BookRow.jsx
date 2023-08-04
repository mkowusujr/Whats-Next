import { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toYear } from '../utils/utils';
import { deleteBook, updateBook } from '../../services/book.service';
import { readingStatuses, ownershipOptions } from '../utils/FormFields';
import { PersonalRatingSelect } from '../utils/PersonalRatingSelect';
import DialogComponent from '../utils/DialogComponent';
import Notes from '../notes/Notes';
import BookDetails from './BookDetails';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Tooltip } from 'react-tooltip';
import '../../sass/media/MediaRow.scss';
import useSubsequentEffect from '../utils/useSubsequentEffect';

export default function BookRow(props) {
  const item = props.item;
  const [readingStatus, setReadingStatus] = useState(item.readingStatus);
  const [personalRating, setPersonalRating] = useState(item.personalRating);
  const [dateStarted, setDateStarted] = useState(item.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(item.dateCompleted);
  const [ownershipStatus, setOwnershipStatus] = useState(item.ownershipStatus);
  const [selectedImage, setSelectedImage] = useState(item.imageUrl);
  const [title, setTitle] = useState(item.title);
  const [subtitle, setSubtitle] = useState(item.subtitle);
  const fileInputRef = useRef(null);

  useSubsequentEffect(() => {
    updateRow();
  }, [
    personalRating,
    readingStatus,
    dateStarted,
    dateCompleted,
    ownershipStatus,
    selectedImage
  ]);

  const updateRow = () => {
    const updatedBook = {
      id: item.id,
      readingStatus: readingStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
      ownershipStatus: ownershipStatus,
      imageUrl: selectedImage,
      title: title,
      subtitle: subtitle
    };

    updateBook(updatedBook)
      .then(book => props.updateItemInList(book))
      .catch(err => console.error(err));
  };

  useSubsequentEffect(() => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month =
      dateObj.getMonth() + 1 < 10
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();

    const todayStr = `${year}-${month}-${day}`;

    if (readingStatus == 'Completed' && dateCompleted == '') {
      setDateCompleted(todayStr);
    } else if (readingStatus == 'Reading' && dateStarted == '') {
      setDateStarted(todayStr);
    }
    
  }, [readingStatus]);

  const deleteRow = () => {
    deleteBook(item.id)
      .then(() => {
        props.setSelectedItem(null);
        props.removeItemFromList(item.id);
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

  const titleStr = `${title}${subtitle ? `: ${subtitle}` : ''}`;

  const handleImageChange = e => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedImage(base64String);
        props.setSelectedItem({ ...item, imageUrl: base64String });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const updateBookDetails = book => {
    props.imgUrlUtils.setImgUrl(book.imageUrl);
  };

  const updateTitleNSubtitle = (
    <div className="update-titles">
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label className="subtitle">
        Subtitle
        <input
          type="text"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
        />
      </label>
    </div>
  );

  const DefaultBookRow = (
    <tr
      id={props.id}
      className="media-row-dafault"
      onClick={() => {
        updateBookDetails(item);
        props.setSelectedItem(item);
      }}
    >
      <td>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <LazyLoadImage
          id={`cover-img${item.id}`}
          src={selectedImage}
          width={130}
          style={{ cursor: 'pointer' }}
          onClick={handleImageClick}
          placeholder={<Skeleton variant="rectangular" height={192} />}
        />
        <Tooltip
          anchorSelect={`#cover-img${item.id}`}
          content="Click On Cover to Manually Change It"
          place="right-start"
        />
      </td>
      <td className="media-info">
        <div className="media-name">
          <p id={`title${item.id}`}>{titleStr}</p>
          <Tooltip
            anchorSelect={`#title${item.id}`}
            afterHide={updateRow}
            clickable
          >
            {updateTitleNSubtitle}
          </Tooltip>
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
        </div>
        <label>
          Reading Status:
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
