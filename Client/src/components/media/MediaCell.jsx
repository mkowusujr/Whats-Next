import { useState } from 'react';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { scores, statuses } from '../../lib/form-fields';
import Select from '../common/Select';
import { deleteMedia, updateMedia } from '../../lib/media.service';
import '../../sass/media_cell.scss';

/**
 * Functional component representing a media item in a list.
 *
 * @param {Object} props - The component's props.
 * @param {Media} props.media - The media object containing information about the item.
 * @param {function} props.removeFromList - Callback function to remove the media item from the list.
 * @param {function} props.updateList - Callback function to update the list after a change.
 * @returns {JSX.Element} - The rendered MediaCell component.
 */
export default function MediaCell({ media, removeFromList, updateList }) {
  const [mediaData, setMediaData] = useState(media);

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
    <Link to={'/media?mediaID=' + media.id}>
      <div>
        <i className="gg-menu"></i>
      </div>
    </Link>
  );

  // Button click handler for deleting the media item
  const handleDeletion = () => {
    deleteMedia(media.id)
      .then(() => removeFromList(media.id))
      .catch(err => console.error(err));
  };

  const deleteBtn = <i className="gg-trash"></i>;
  //<button onClick={handleDeletion}><i className="gg-trash"></i></button>;

  return (
    <div className="media-cell-item">
      <LazyLoadImage
        id={`cover-img${media.id}`}
        src={media.img}
        width={50}
        placeholder={<Skeleton variant="rectangular" height={100} width={50} />}
      />
      <div className="media-cell-title">
        <p>{(media.title + ' ' + (media.subTitle ?? '')).trim()}</p>
      </div>
      <div className="media-cell-options">
        {scoreSelector}
        {statusSelector}
        {viewMoreBtn}
        {deleteBtn}
      </div>
    </div>
  );
}

MediaCell.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number,
    mediaType: PropTypes.string,
    img: PropTypes.string
  }).isRequired,
  removeFromList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired
};
