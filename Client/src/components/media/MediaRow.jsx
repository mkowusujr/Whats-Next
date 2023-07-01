import { useEffect, useState } from 'react';
import {
  watchStatuses,
  ratings,
  ownershipOptions,
  pRatingColors,
  pRatingToNum
} from './FormFields';
import { deleteMedia, updateMedia } from '../../services/media.service';
import '../../sass/media/MediaRow.scss';
import Notes from '../notes/Notes';
import DialogComponent from '../utils/DialogComponent';
import MediaDetails from './MediaDetails';
import {LazyLoadImage} from 'react-lazy-load-image-component'

export default function MediaRow(props) {
  const media = props.media;
  const index = props.index;

  const [watchStatus, setWatchStatus] = useState(media.watchStatus);
  const [personalRating, setPersonalRating] = useState(media.personalRating);
  const [dateStarted, setDateStarted] = useState(media.dateStarted);
  const [dateCompleted, setDateCompleted] = useState(media.dateCompleted);
  const [ownershipStatus, setOwnershipStatus] = useState(media.ownershipStatus);

  useEffect(() => {
    updateRow();
  }, [
    personalRating,
    watchStatus,
    dateStarted,
    dateCompleted,
    ownershipStatus
  ]);

  const titleCase = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const toYear = timestamp => {
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
      ownershipStatus: ownershipStatus
    };

    updateMedia(updatedMedia)
      .then(() => props.updateMediaList())
      .catch(err => console.error(err));
  };

  const deleteRow = () => {
    deleteMedia(media)
      .then(() => props.updateMediaList())
      .catch(err => console.error(err));
  };
  const preloadImage = url => (document.createElement('img').src = url);
  preloadImage(media.posterImageUrl);

  const WatchStatusSelect = (
    <select value={watchStatus} onChange={e => setWatchStatus(e.target.value)}>
      {watchStatuses.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  const pRatingSelectColors =
    personalRating != ratings[0]
      ? Object.values(pRatingColors)[pRatingToNum(personalRating) - 1]
      : { background: '#e8e7e7', font: 'black' };

  const PersonalRatingSelect = (
    <select
      style={{
        backgroundColor: pRatingSelectColors.background,
        color: pRatingSelectColors.font
      }}
      value={personalRating}
      onChange={e => setPersonalRating(e.target.value)}
    >
      {ratings.map((rating, index) => (
        <option key={index} value={rating}>
          {rating}
        </option>
      ))}
    </select>
  );

  const DefaultMediaRow = (
    <tr
      className="media-row-dafault"
      key={index}
      onClick={() => {
        props.imgUrlUtils.setImgUrl(media.posterImageUrl);
        props.setSelectedMedia(media);
      }}
    >
      <td>
        {/* <img className="poster-image" src={media.posterImageUrl} /> */}
        <LazyLoadImage src={media.posterImageUrl} width={130} />
      </td>
      <td className="media-info">
        <div className="media-name">
          <p>{media.name}</p>
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
          {titleCase(media.mediaType)} | {toYear(media.releaseDate)} |{' '}
          {media.genres.replaceAll(',', ', ')}
        </div>
        <div className="media-user-info">
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
            {PersonalRatingSelect}
          </label>
        </div>
      </td>
      <td>
        <div className="media-options">
          <Notes mediaID={media.id} />
          <input type="button" onClick={deleteRow} value="Delete" />
        </div>
      </td>
    </tr>
  );
  const MobileMediaRow = (
    <tr className="media-row-mobile">
      <td className="col-1">
        <span className="text">{media.name}</span>
      </td>
      <td colSpan={2}>
        {/* <div className="col-1"> */}
        <span className="media-info-mobile">
          {`${toYear(media.releaseDate)} ${media.mediaType}`}
          {/* </div> */}
        </span>
        {/* <td> */}
        <span>{WatchStatusSelect}</span>
        <span>{PersonalRatingSelect}</span>
        {/* </td> */}
        {/* <td> */}
        <DialogComponent
          buttonText="View More"
          cmpnt={<MediaDetails media={media} />}
        />
        <DialogComponent buttonText="Edit Details" cmpnt={<></>} />
        {/* </td> */}
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
