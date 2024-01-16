import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';

import ProjectTracker from '../Progress/ProgressTracker';
import MediaNotes from '../notes/MediaNotes';
import { scores, statuses, storageTypes } from '../common/FormFields';
import Select from '../common/Select';

/**
 * Functional component for displaying detailed information about a media item.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.media - Object containing media-related information.
 * @param {number} props.media.score - The score of the media item.
 * @param {string} props.media.status - The status of the media item.
 * @param {string} props.media.storage - The storage type of the media item.
 * @param {Object} props.mediaInfo - Object containing additional media information.
 * @param {string} props.mediaInfo.img - The URL of the media item's image.
 * @param {string} props.mediaInfo.creator - The creator of the media item.
 * @param {string} props.mediaInfo.summary - The summary of the media item.
 * @param {string} props.mediaInfo.releaseDate - The release date of the media item.
 * @param {function} props.handleChange - Callback function for handling changes in media fields.
 * @param {Array} props.progressTrackingUtils - Array containing progress tracking information.
 * @param {Array} props.noteUtils - Array containing notes related to the media item.
 * @returns {JSX.Element} - The rendered MediaMoreInfo component.
 */
export default function MediaMoreInfo({
  media,
  mediaInfo,
  handleChange,
  progressTrackingUtils,
  noteUtils
}) {
  const mediaFields = (
    <div className="media-fields">
      <Select
        label={'Score: '}
        name={'score'}
        value={media.score}
        options={scores}
        onChange={handleChange}
      />
      <Select
        label={'Status: '}
        name={'status'}
        value={media.status}
        options={statuses}
        onChange={handleChange}
      />
      <Select
        label={'Storage: '}
        name={'storage'}
        value={media.storage}
        options={storageTypes}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="media-info">
      <h1>{media.title.toUpperCase()}</h1>
      <p>Released on {new Date(mediaInfo.releaseDate).toDateString()}</p>
      <p>{mediaInfo.creator}</p>
      <LazyLoadImage src={mediaInfo.img} width={200} />
      <p className="desc">{mediaInfo.summary}</p>
      <>{mediaFields}</>
      <hr />
      <ProjectTracker
        media={media}
        progressTrackingUtils={progressTrackingUtils}
      />
      <hr />
      <MediaNotes mediaID={media.id} noteUtils={noteUtils} />
    </div>
  );
}

MediaMoreInfo.propTypes = {
  media: PropTypes.shape({
    score: PropTypes.number,
    status: PropTypes.string,
    storage: PropTypes.string
  }).isRequired,
  mediaInfo: PropTypes.shape({
    img: PropTypes.string,
    creator: PropTypes.string,
    summary: PropTypes.string,
    releaseDate: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  progressTracking: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};
