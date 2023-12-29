export default function Select(props) {
  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
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
}
