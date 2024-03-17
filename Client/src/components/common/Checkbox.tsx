import clsx from 'clsx';

type CheckBoxProps = {
  label: string;
  isChecked: boolean;
  handleChange: () => void;
};

export default function Checkbox({
  label,
  isChecked,
  handleChange
}: CheckBoxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <div
        className={clsx(
          'mr-2 flex items-center justify-center rounded-md border-2 border-primary',
          isChecked && 'border-base-100 bg-primary',
          !isChecked && 'bg-secondary text-primary'
        )}
      >
        <input
          type="checkbox"
          className="absolute opacity-0"
          checked={isChecked}
          onChange={() => handleChange()}
        />
        <span className="select-none px-4">{label}</span>
      </div>
    </label>
  );
}
