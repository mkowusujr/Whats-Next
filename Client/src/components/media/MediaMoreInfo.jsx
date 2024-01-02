import ProjectTracker from '../Progress/ProgressTracker';
import MediaNotes from '../notes/MediaNotes';
import { scores, statuses, storageTypes } from '../utils/FormFields';
import Select from '../utils/Select';
import '../../sass/media.scss';

export default function MediaMoreInfo(props) {
  const media = props.media;
  const mediaInfo = props.mediaInfo;

  const mediaFields = (
    <div className="media-fields">
      <Select
        label={'Score: '}
        name={'score'}
        value={media.score}
        options={scores}
        onChange={props.handleChange}
      />
      <Select
        label={'Status: '}
        name={'status'}
        value={media.status}
        options={statuses}
        onChange={props.handleChange}
      />
      <Select
        label={'Storage: '}
        name={'storage'}
        value={media.storage}
        options={storageTypes}
        onChange={props.handleChange}
      />
    </div>
  );

  return (
    <div className="media-info">
      <h1>{media.title.toUpperCase()}</h1>
      <p>Released on {new Date(mediaInfo.releaseDate).toDateString()}</p>
      <p>{mediaInfo.creator}</p>
      <img style={{ width: '200px' }} src={mediaInfo.img} />
      <p className="desc">{mediaInfo.summary}</p>

      {mediaFields}
      <hr />
      <ProjectTracker media={media} progressTracking={props.progressTracking} />
      <hr />
      <MediaNotes mediaID={media.id} notes={props.notes} />
    </div>
  );
}
