
import { usePalette } from 'react-palette';
export default function CategoryTable(props) {
  const categoryList = props.categoryList;
  const show = props.show == null || props.show == '' ? 'Show All' : props.show;
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
            <td colSpan={3}>{show.toUpperCase()}</td>
          </tr>
        </thead>
        <tbody>
          {categoryList.map(item => (
            <props.rowElement
              key={item.id}
              item={item}
              updateCategoryList={props.updateCategoryList}
              imgUrlUtils={props.imgUrlUtils}
              setSelectedItem={props.setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}