import { useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import MediaMoreInfo from './MediaMoreInfo';
import DialogComponent from '../common/DialogComponent';
import { scores, statuses } from '../common/FormFields';
import Select from '../common/Select';
import {
  getMediaInfo,
  deleteMedia,
  updateMedia
} from '../../services/media.service';
import { listNotesForMedia } from '../../services/notes.service';
import { listProgressForMedia } from '../../services/progress.service';
import '../../sass/media.scss';

/**
 * Functional component representing a media item in a list.
 *
 * @param {Object} props - The component's props.
 * @param {Media} props.media - The media object containing information about the item.
 * @param {function} props.removeFromList - Callback function to remove the media item from the list.
 * @param {function} props.updateList - Callback function to update the list after a change.
 * @returns {JSX.Element} - The rendered MediaItem component.
 */
export default function MediaItem({ media, removeFromList, updateList }) {
  const [mediaData, setMediaData] = useState(media);
  const [mediaInfo, setMediaInfo] = useState({});
  const [progressList, setProgressList] = useState([]);
  const [noteList, setNoteList] = useState([]);

  /**
   * Sets up additional media information, progress list, and note list.
   */
  const setupMediaInfo = () => {
    getMediaInfo(media.id)
      .then(m => setMediaInfo(m))
      .catch(err => console.error(err));

    listProgressForMedia(media.id)
      .then(ps => setProgressList(ps))
      .catch(err => console.error(err));

    listNotesForMedia(media.id)
      .then(ns => setNoteList(ns))
      .catch(err => console.error(err));
  };

  /**
   * Handles changes in input fields and updates the media data.
   * @param {Event} e - The input change event.
   */
  const handleChange = e => {
    const { name, value } = e.target;
    setMediaData({ ...media, [name]: value });
    updateMedia({ ...media, [name]: value })
      .then(m => updateList(m))
      .catch(err => console.error(err));
  };

  // Selectors for score and status dropdowns
  const scoreSelector = (
    <Select
      name={'score'}
      value={mediaData.score}
      options={scores}
      onChange={handleChange}
    />
  );
  const statusSelector = (
    <Select
      name={'status'}
      value={mediaData.status}
      options={statuses}
      onChange={handleChange}
    />
  );

  const viewMoreBtn = (
    <DialogComponent
      buttonText={'View More'}
      onOpen={setupMediaInfo}
      element={
        <MediaMoreInfo
          media={media}
          mediaInfo={mediaInfo}
          progressTrackingUtils={[progressList, setProgressList]}
          noteUtils={[noteList, setNoteList]}
          handleChange={handleChange}
        />
      }
    />
  );

  // Button click handler for deleting the media item
  const handleDeletion = () => {
    deleteMedia(media.id)
      .then(() => removeFromList(media.id))
      .catch(err => console.error(err));
  };

  const deleteBtn = <button onClick={handleDeletion}>Remove</button>;

  return (
    <tr className="media-item">
      <td>
        <LazyLoadImage
          id={`cover-img${media.id}`}
          src={media.img}
          width={50}
          placeholder={
            <Skeleton variant="rectangular" height={100} width={50} />
          }
        />
      </td>
      <td>
        <input
          value={mediaData.title}
          name="title"
          size={mediaData.title.length}
          onChange={handleChange}
        />
        <input
          value={mediaData.subTitle ?? ''}
          name="subTitle"
          size={
            mediaData.subTitle ? mediaData.subTitle.length : 'SubTitle'.length
          }
          placeholder="SubTitle"
          onChange={handleChange}
        />
      </td>
      <td>{media.mediaType}</td>
      <td>{scoreSelector}</td>
      <td>{statusSelector}</td>
      <td>{viewMoreBtn}</td>
      <td>{deleteBtn}</td>
    </tr>
  );
}

MediaItem.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number,
    mediaType: PropTypes.string,
    img: PropTypes.string
  }).isRequired,
  removeFromList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired
};
