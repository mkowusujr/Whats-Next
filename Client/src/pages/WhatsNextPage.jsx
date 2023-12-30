import { useEffect, useState } from 'react';
import { getSummary } from '../services/summary.service';

export default function WhatsNextPage() {
  const [summary, setSummary] = useState({
    completed: [],
    inprogress: [],
    planned: [],
    notes: []
  });

  useEffect(() => {
    getSummary()
      .then(s => setSummary(s))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h2>In Progress</h2>
        <ul>
          {summary.inprogress.map(i => (
            <li key={i.id}>{JSON.stringify(i)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>What's Next?</h2>
        <ul>
          {summary.planned.map(i => (
            <li key={i.id}>{JSON.stringify(i)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Recently Completed</h2>
        <ul>
          {summary.completed.map(i => (
            <li key={i.id}>{JSON.stringify(i)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Recent Notes</h2>
        <ul>
          {summary.notes.map(i => (
            <li key={i.id}>{JSON.stringify(i)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
