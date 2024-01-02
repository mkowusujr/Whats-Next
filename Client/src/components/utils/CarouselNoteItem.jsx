import PropTypes from 'prop-types';

import '../../sass/summary.scss';

/**
 * Displays a carousel item for a note.
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.note - The note object containing title, mediaTitle, mediaSubTitle, dateCreated, and content.
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function CarouselNoteItem({ note }) {
  return (
    <div className="carousel-item">
      <div className="carousel-note-title">
        <h4>{note.title}</h4>
        <p>
          {note.mediaTitle +
            (note.mediaSubTitle ? ' ' + note.mediaSubTitle : '')}
        </p>
        <p>
          <i>Created on {new Date(note.dateCreated).toDateString()} </i>
        </p>
      </div>
      <p>{note.content}</p>
    </div>
  );
}

CarouselNoteItem.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    mediaTitle: PropTypes.string.isRequired,
    mediaSubTitle: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};
