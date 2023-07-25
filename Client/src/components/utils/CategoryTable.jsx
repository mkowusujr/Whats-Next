import '../../sass/media/MediaTable.scss';
import { usePalette } from 'react-palette';
import EmptyRow from './EmptyRow';
export default function CategoryTable(props) {
  const categoryList = props.categoryList;
  const { data, loading, error } = usePalette(props.imgUrlUtils.imgUrl);

  return (
    <div className="media-table">
      <table
        style={{
          borderColor: data.darkMuted
        }}
      >
        <thead
          style={{
            background: data.darkVibrant
          }}
        >
          <tr className="sort-by-prop">
            <td colSpan={3}>{props.filters}</td>
          </tr>
        </thead>
        <tbody>
          {categoryList.length != 0 ? (
            categoryList.map(item => (
              <props.rowElement
                key={item.id}
                item={item}
                removeItemFromList={props.removeItemFromList}
                updateItemInList={props.updateItemInList}
                imgUrlUtils={props.imgUrlUtils}
                setSelectedItem={props.setSelectedItem}
              />
            ))
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </div>
  );
}
