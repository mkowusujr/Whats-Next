import '../../sass/media/MediaDetails.scss';

export default function MediaDetails(props) {
  const media = props.media;
  const castList = JSON.parse(media.cast).map(
    a => `${a.name} as ${a.roles.map(r => r.name)}, `
  );

  return (
    <div className="media-details">
      <img src={media.posterImageUrl} />
      <div className="offical-info">
        <div className="imdb-stats">
          <label>
            Release Date: {new Date(media.releaseDate).toDateString()}
          </label>
          <label>IMDB Rating: {media.imdbRating}</label>
          <label>Runtime: {media.runtime}</label>
        </div>
        <p>{media.plot}</p>
        <label>
          Directors:{' '}
          {JSON.parse(media.directors)
            .map(d => d.name)
            .toString()}
        </label>
        <label>
          Writers:{' '}
          {JSON.parse(media.writers)
            .map(w => w.name)
            .toString()}
        </label>
        <label>
          Cast: {castList.slice(0, 9)}
          <details>
            <summary>Show More</summary>
            {castList.slice(9, castList.length - 1)}
          </details>
        </label>
      </div>
    </div>
  );
}
