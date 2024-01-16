import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import '../../sass/summary.scss';

/**
 * Displays a carousel item for a note.
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.data - The data object containing title, mediaTitle, mediaSubTitle, dateCreated, and content.
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function CarouselNoteItem({ data }) {
  return (
    <Link to={"/media?mediaID=" + data.mediaID}>
      
    <div className="carousel-item">
      <div className="carousel-data-title">
        <h4>{data.title}</h4>
        <p>
          {data.mediaTitle +
            (data.mediaSubTitle ? ' ' + data.mediaSubTitle : '')}
        </p>
        <p>
          <i>Created on {new Date(data.dateCreated).toDateString()} </i>
        </p>
      </div>
      <p>{data.content}</p>
    </div>
    </Link>
  );
}

CarouselNoteItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    mediaTitle: PropTypes.string.isRequired,
    mediaSubTitle: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};
