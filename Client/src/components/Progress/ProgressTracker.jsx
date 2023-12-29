import { useEffect, useState } from 'react';
import { getProgressForMedia } from '../../services/progress.service';
import ProjectItem from './ProgressItem';

export default function ProjectTracker(props) {
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    getProgressForMedia(props.mediaID)
      .then(ps => setProgressList(ps))
      .catch(err => console.error(err));
  }, [props.mediaID]);

  const progressItems = progressList.map(p => (
    <ProjectItem key={p.id} progress={p} />
  ));

  return (
    <>
      <h2>Progreess tracker</h2>
      <table>
        <thead>
          <th>Current</th>
          <th>Total</th>
          <th>Units</th>
          <th>Date Started</th>
          <th>Date Completed</th>
        </thead>
        <tbody>{progressItems}</tbody>
      </table>
    </>
  );
}
