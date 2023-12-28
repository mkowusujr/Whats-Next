import { useEffect, useState } from 'react';
import {
  getProgress,
  addProgress,
  updateProgress
} from '../../services/progress.service';
import useSubsequentEffect from './useSubsequentEffect';
import '../../sass/Progress.scss';
import { bookProgressUnits, mediaProgressUnits } from './FormFields';

export default function ProgressTracker(props) {
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (props.progressID != "") {
      getProgress(props.progressID).then(p => setProgress(p));
    } else {
      addProgress({
        type: props.type,
        itemID: props.itemID,
        progress: { current: '', total: '', unit: '' }
      }).then(pID => getProgress(pID).then(p => setProgress(p)));
    }
  }, []);

  return progress ? (
    <ProgressFormFields progress={progress} type={props.type} />
  ) : (
    <></>
  );
}

function ProgressFormFields(props) {
  const progress = props.progress;
  const [current, setCurrent] = useState('');
  const [total, setTotal] = useState('');
  const [unit, setUnit] = useState('');
  // const [unitsOptions, setUnitsOptions] = useState([])

  useEffect(() => {
    if (progress) {
      setCurrent(progress.current);
      setTotal(progress.total);
      setUnit(progress.unit);
    }
  }, []);

  useSubsequentEffect(() => {
    if (progress) {
      const updatedProgress = {
        id: progress.id,
        current: current,
        total: total,
        unit: unit
      };
      updateProgress(updatedProgress).then(p => {
        setCurrent(p.current);
        setTotal(p.total);
        setUnit(p.unit);
      });
    }
  }, [current, total, unit]);

  return (
    <div className="progress-item">
      <span>
        <input
          type="number"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          placeholder="Current"
        />
        <span> /</span>
        <input
          type="number"
          value={total}
          onChange={e => setTotal(e.target.value)}
          placeholder="Total"
        />
      </span>
      {/* <input
        type="text"
        value={unit}
        onChange={e => setUnit(e.target.value)}
        placeholder="Units"
      /> */}
      <select value={unit} onChange={e => setUnit(e.target.value)}>
        {[
          '',
          ...(props.type == 'media' ? mediaProgressUnits : bookProgressUnits)
        ].map((u, key) => (
          <option key={key} value={u}>
            {u == '' ? 'Select Unit' : u}
          </option>
        ))}
      </select>
    </div>
  );
}
