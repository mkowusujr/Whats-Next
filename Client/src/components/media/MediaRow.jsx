import { useState } from 'react';
import { watchStatuses, ownershipOptions } from '../utils/FormFields';
import { deleteMedia, updateMedia } from '../../services/media.service';
import '../../sass/media/MediaRow.scss';
import Notes from '../notes/Notes';
import DialogComponent from '../utils/DialogComponent';
import MediaDetails from './MediaDetails';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { titleCase, toYear } from '../utils/utils';
import { PersonalRatingSelect } from '../utils/PersonalRatingSelect';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useSubsequentEffect from '../utils/useSubsequentEffect';

export default function MediaRow(props) {
  const item = props.item;

  const [watchStatus, setWatchStatus] = useState(item.watchStatus);
  const [personalRating, setPersonalRating] = useState(item.personalRating);
  const [dateStarted, setDateStarted] = useState(item.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(item.dateCompleted);
  const [ownershipStatus, setOwnershipStatus] = useState(item.ownershipStatus);

  useSubsequentEffect(() => {
    updateRow();
  }, [
    personalRating,
    watchStatus,
    dateStarted,
    dateCompleted,
    ownershipStatus
  ]);

  const updateRow = () => {
    const updatedMedia = {
      id: item.id,
      watchStatus: watchStatus,
      personalRating: personalRating,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
      ownershipStatus: ownershipStatus
    };

    updateMedia(updatedMedia)
      .then(media => props.updateItemInList(media))
      .catch(err => console.error(err));
  };

  const deleteRow = () => {
    deleteMedia(item.id)
      .then(() => {
        props.setSelectedItem(null);
        props.removeItemFromList(item.id);
      })
      .catch(err => console.error(err));
  };

  const preloadImage = url => (document.createElement('img').src = url);
  preloadImage(item.posterImageUrl);

  const WatchStatusSelect = (
    <select value={watchStatus} onChange={e => setWatchStatus(e.target.value)}>
      {watchStatuses.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  const DefaultMediaRow = (
    <tr
      id={props.id}
      className="media-row-dafault"
      onClick={() => {
        props.imgUrlUtils.setImgUrl(item.posterImageUrl);
        props.setSelectedItem(item);
      }}
    >
      <td>
        <LazyLoadImage
          src={item.posterImageUrl}
          width={130}
          placeholder={<Skeleton variant="rectangular" height={192} />}
        />
      </td>
      <td className="media-info">
        <div className="media-name">
          <p>{item.name}</p>
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
          {titleCase(item.mediaType)} | {toYear(item.releaseDate)} |{' '}
          {item.genres.replaceAll(',', ', ')}
        </div>
        <label>
          Watch Status:
          {WatchStatusSelect}
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
          <Notes mediaID={item.id} />
          <input type="button" onClick={deleteRow} value="Delete" />
        </div>
      </td>
    </tr>
  );

  const MobileMediaRow = (
    <tr className="media-row-mobile">
      <td className="col-1">
        <span className="text">{item.name}</span>
      </td>
      <td colSpan={2}>
        <span className="media-info-mobile">
          {`${toYear(item.releaseDate)} ${item.mediaType}`}
        </span>
        <span>{WatchStatusSelect}</span>
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
          cmpnt={<MediaDetails media={item} />}
        />
        <DialogComponent buttonText="Edit Details" cmpnt={<></>} />
      </td>
    </tr>
  );

  return (
    <>
      {MobileMediaRow}
      {DefaultMediaRow}
    </>
  );
}
