import '../../sass/media/Media.scss';
export default function Category(props) {
  return (
    <>
      <div className="media">
        <div className="media-display">
          <div className="media-utils">
            {props.AddForm}
            {props.CategoryFilter}
          </div>
          {props.Table}
        </div>
        <>
          {props.selectedRow ? (
            props.ItemDetails
          ) : (
            <p className="media-details">No Media Selected</p>
          )}
        </>
      </div>
    </>
  );
}
