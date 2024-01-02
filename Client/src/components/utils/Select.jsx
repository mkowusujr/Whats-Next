import { PropTypes } from 'prop-types';

/**
 * Component representing a dropdown select.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the select element.
 * @param {string} props.label - The label associated with the select element.
 * @param {Array} props.options - The options available in the dropdown.
 * @param {string} props.value - The current selected value.
 * @param {Function} props.onChange - The callback function triggered on value change.
 * @param {boolean} props.isRequired - Indicates whether the select element is required.
 * @returns {JSX.Element} - The rendered Select component.
 */
export default function Select({
  name,
  label,
  options,
  value,
  onChange,
  isRequired
}) {
  const selectComponent = (
    <select
      name={name}
      value={value ?? ''}
      onChange={onChange}
      required={isRequired}
    >
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {label ? (
        <label>
          {label}
          {selectComponent}
        </label>
      ) : (
        <>{selectComponent}</>
      )}
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
};
