import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../sass/media/MediaRow.scss';
import '../../sass/summary/Summary.scss';
export default function BasicRow(props) {
  const item = props.item;

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

  return (
    <tr>
      <td className="img-cell">
        <LazyLoadImage
          id={`cover-img${item.id}`}
          src={item.i}
          width={130}
          style={{ cursor: 'pointer' }}
          placeholder={<Skeleton variant="rectangular" height={192} />}
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
          <span>Days In Progress: {countDaysBetweenDates(item.dS)}</span>
        )}
      </td>
    </tr>
  );
}