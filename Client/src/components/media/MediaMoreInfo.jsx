import ProjectTracker from '../Progress/ProgressTracker';

export default function MediaMoreInfo(props) {
  const media = props.media;

  return (
    <>
      <h1>{media.title}</h1>
      <ProjectTracker mediaID={media.id} />
    </>
  );
}
