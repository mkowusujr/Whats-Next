import ProgressItem from './ProgressItem';
import AddProjectItem from './AddProgressItem';

export default function ProjectTracker(props) {
  const progressList = props.progressTracking.get;
  const setProgressList = props.progressTracking.set;
  const addToList = item => {
    setProgressList([item, ...progressList]);
  };
  const removeFromList = id => {
    setProgressList(progressList.filter(p => p.id != id));
  };

  const progressItems = progressList.map(p => (
    <ProgressItem
      key={p.id}
      progress={p}
      mediaType={props.media.mediaType}
      removeFromList={removeFromList}
    />
  ));

  return (
    <>
      <h2>Progreess tracker</h2>
      <AddProjectItem
        mediaID={props.media.id}
        mediaType={props.media.mediaType}
        addToList={addToList}
      />
      <h3>Progress History</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{progressItems}</tbody>
      </table>
    </>
  );
}
