import { usePalette } from 'react-palette';
import '../../sass/media/MediaRow.scss';
import '../../sass/summary/Summary.scss';
import '../../sass/summary/PlannedItems.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EmptyRow from '../utils/EmptyRow';
import '../../sass/summary/Summary.scss';
// import Carousel from 'nuka-carousel';
import Carousel from 'nuka-carousel';

function LoadingItem() {
  return (
    <div className="planned-item">
      <div className="img-cell">
        <Skeleton height={86} width={'4em'} />
      </div>
      <div className="text">
        <Skeleton height={20} width={250} />
        <Skeleton height={20} width={250} />
        <Skeleton height={20} width={250} />
      </div>
    </div>
  );
}

const PlannedItem = props => {
  const { data, loading, error } = usePalette(props.item.i);
  return (
    <div
      className="planned-item"
      style={{
        backgroundColor: `${data.lightVibrant}`,
        borderColor: `${data.vibrant}`,
        color: `${data.darkMuted}`
      }}
    >
      <img src={props.item.i} />
      <div className="info">
        <span>{props.item.n}</span>
        <span>{props.item.t}</span>
        <span>Duration: {props.item.d}</span>
      </div>
    </div>
  );
};

export default function PlannedItems(props) {
  const { data, loading, error } = usePalette(props.imgUrlUtils.imgUrl);

  return (
    <>
      {props.dataList ? (
        <>
          {props.dataList.length != 0 ? (
            <Carousel
              autoplay
              enableKeyboardControls
              wrapAround
              withoutControls
            >
              {props.dataList.map(i => (
                <PlannedItem key={i.id} item={i} />
              ))}
            </Carousel>
          ) : (
            <EmptyRow />
          )}
        </>
      ) : (
        <Carousel>
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
        </Carousel>
      )}
    </>
  );
}
