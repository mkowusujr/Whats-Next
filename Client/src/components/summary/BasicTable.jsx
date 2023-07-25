import { usePalette } from 'react-palette';
import BasicRow from './BasicRow';
import '../../sass/media/MediaRow.scss';
import '../../sass/summary/Summary.scss';
import EmptyRow from '../utils/EmptyRow';
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
          {props.dataList.length != 0 ? (
            props.dataList.map(i => (
              <BasicRow key={i.id} item={i} showDC={props.showDC} />
            ))
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </div>
  );
}
