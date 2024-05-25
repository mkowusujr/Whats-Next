// import { cn } from '@/lib/utils/styles';

import { cn } from '@/lib/utils';

/** The properties passed to the component. */
type SelectProps = {
  /** The name of the select element. */
  name: string;
  /** The label associated with the select element. */
  label?: string;
  /** The options available in the dropdown. */
  options: any[];
  /** The current selected value.  */
  value: any;
  /** The callback function triggered on value change. */
  onChange: (e: any) => void;
  /** Indicates whether the select element is required. */
  isRequired?: boolean;
  className?: string;
};

/** Component representing a dropdown select. */
export default function Select({
  name,
  label,
  options,
  value,
  onChange,
  isRequired,
  className
}: SelectProps) {
  const SelectComponent = () => (
    <select
      name={name}
      value={value ?? ''}
      onChange={onChange}
      required={isRequired}
      className={cn(
        'cursor-pointer rounded-md bg-secondary px-4 py-1 text-primary',
        className
      )}
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
          <SelectComponent />
        </label>
      ) : (
        <SelectComponent />
      )}
    </>
  );
}
