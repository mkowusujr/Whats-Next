import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../sass/media/MediaRow.scss';
import '../../sass/summary/Summary.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProgress } from '../../services/progress.service';
import ProgressTracker from '../utils/ProgressTracker';
export default function BasicRow(props) {
  const item = props.item;
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (item.s == 'Watching' || item.s == 'Reading') {
      getProgress(item.p).then(p => {
        setProgress(p);
      });
    }
  }, []);

  const countDaysBetweenDates = (startDate, endDate) => {
    // Convert the target date to milliseconds since January 1, 1970
    startDate = new Date(startDate).getTime();

    // Get the current date in milliseconds
    endDate = endDate ? new Date(endDate).getTime() : new Date().getTime();

    // Calculate the difference between the two dates in milliseconds
    const difference = endDate - startDate;

    // Convert the difference to days
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const navigate = useNavigate();
  const navigateToSpecificedElement = () => {
    navigate(`${props.category}#row${item.id.slice(0, 2)}`);
  };

  return (
    <tr onClick={navigateToSpecificedElement}>
      <td className="img-cell">
        <LazyLoadImage
          id={`cover-img${item.id}`}
          src={item.i}
          width={130}
          style={{ cursor: 'pointer' }}
          placeholder={
            <Skeleton variant="rectangular" height={86} width={56} />
          }
        />
      </td>
      <td className="text">
        <span>{item.n}</span>
        <span className="media-info-info">{item.t}</span>
        <span>Started on {new Date(item.dS).toLocaleDateString()}</span>
        {props.showDC ? (
          <>
            <span>
              Completed on {new Date(item.dC).toLocaleDateString()} in{' '}
              {countDaysBetweenDates(item.dS, item.dC) + 1} Day(s)
            </span>
            <span>Rated: {item.r}</span>
          </>
        ) : (
          <div className="sum-progress">
            <span>Days In Progress: {countDaysBetweenDates(item.dS)}</span>
            {progress ? (
              <>
                <span>{`${progress.current}/${progress.total} ${
                  progress.unit
                } ...${((progress.current / progress.total) * 100).toFixed(
                  2
                )}% Complete`}</span>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
