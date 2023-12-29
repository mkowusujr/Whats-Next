import { useEffect, useState } from 'react';
import { getProgress, updateProgress } from '../../services/progress.service';

export default function ProjectItem(props) {
  const [progress, setProgress] = useState(props.progress);

  useEffect(() => {
    updateProgress(progress).catch(err => console.error(err));
  }, [progress]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const currentInput = (
    <input
      name="current"
      type="text"
      value={progress.current}
      onChange={handleChange}
    />
  );

  const totalInput = (
    <input
      name="total"
      type="text"
      value={progress.total}
      onChange={handleChange}
    />
  );

  const unitInput = (
    <input
      name="unit"
      type="text"
      value={progress.unit}
      onChange={handleChange}
    />
  );

  const dateStartedtInput = (
    <input
      name="dateStarted"
      type="date"
      value={progress.dateStarted}
      onChange={handleChange}
    />
  );

  const dateCompletedtInput = (
    <input
      name="dateCompleted"
      type="date"
      value={progress.dateCompleted}
      onChange={handleChange}
    />
  );

  return (
    <tr>
      <td>{currentInput}</td>
      <td>{totalInput}</td>
      <td>{unitInput}</td>
      <td>{dateStartedtInput}</td>
      <td>{dateCompletedtInput}</td>
    </tr>
  );
}
