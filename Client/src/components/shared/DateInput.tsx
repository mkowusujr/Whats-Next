type Props = {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function DateInput({
  label,
  name,
  value,
  onChange,
  required = false
}: Props) {
  return (
    <label>
      {label}
      <input
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-borders-600 bg-interactive-300 px-4 py-1 text-solid-900 placeholder-base-100 outline-none"
        required={required}
      />
    </label>
  );
}
