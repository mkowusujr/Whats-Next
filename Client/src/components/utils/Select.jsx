export default function Select(props) {
  const selectComponent = (
    <select
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      required={props.isRequired}
    >
      {props.options.map(option => (
        <option
          key={option.label}
          value={option.value}
          disabled={option.isDisabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {props.label ? (
        <label>
          {props.label}
          {selectComponent}
        </label>
      ) : (
        <>{selectComponent}</>
      )}
    </>
  );
}
