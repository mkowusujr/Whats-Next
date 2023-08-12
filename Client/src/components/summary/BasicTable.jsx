import { usePalette } from 'react-palette';
import BasicRow from './BasicRow';
import '../../sass/media/MediaRow.scss';
import '../../sass/summary/Summary.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EmptyRow from '../utils/EmptyRow';

function LoadingRow() {
  return (
    <tr>
      <td className="img-cell">
        <Skeleton  height={86} width={'4em'} />
      </td>
      <td className="text">
        <Skeleton height={20} width={250} />
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={350} />
        <Skeleton height={20} width={280} />
      </td>
    </tr>
  );
}

export default function BasicTable(props) {
  const { data, loading, error } = usePalette(props.imgUrlUtils.imgUrl);
  return (
    <div className="summary-table">
      <table className="">
        <thead
          style={{
            background: data.darkVibrant
          }}
        >
          <tr className="">
            <td colSpan={2}>{props.title}</td>
          </tr>
        </thead>
        <tbody>
          {props.dataList ? (
            props.dataList.length != 0 ? (
              props.dataList.map(i => (
                <BasicRow
                  key={i.id}
                  item={i}
                  showDC={props.showDC}
                  category={i.c == 'readnext' ? 'readnext' : 'watchnext'}
                />
              ))
            ) : (
              <EmptyRow />
            )
          ) : (
            <>
              <LoadingRow />
              <LoadingRow />
              <LoadingRow />
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
