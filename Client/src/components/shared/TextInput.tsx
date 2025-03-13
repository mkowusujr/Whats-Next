import { cn } from '@/lib/utils';

type Props = {
  name: string;
  value?: string;
  placeholder: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function TextInput({
  name,
  value,
  placeholder,
  className,
  onChange,
  required = false
}: Props) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className={cn(
        'w-full rounded-md border border-borders-600 bg-interactive-300 px-4 py-1 text-solid-900 placeholder-accessible-1200 outline-none hover:border-borders-700 hover:text-solid-1000',
        className
      )}
      required={required}
    />
  );
}
