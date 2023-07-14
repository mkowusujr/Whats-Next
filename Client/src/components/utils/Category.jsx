export default function Category(props) {
  return (
    <>
      <div className="media">
        <div className="media-display">
          {props.AddForm}
          {props.CategoryFilter}
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
