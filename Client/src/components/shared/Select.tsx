import { v4 as uuidv4 } from 'uuid';
import {
  ShadcnSelect,
  ShadcnSelectTrigger,
  ShadcnSelectValue,
  ShadcnSelectContent,
  ShadcnSelectGroup,
  ShadcnSelectItem
} from '../ui/select';
import { SelectOption } from '@/types/filters';

type Props = {
  value: string | undefined;
  onValueChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
};

export default function Select({
  value,
  onValueChange,
  options,
  placeholder,
  required = false
}: Props) {
  return (
    <ShadcnSelect
      value={value}
      onValueChange={onValueChange}
      required={required}
    >
      <ShadcnSelectTrigger className="h-[42px] w-[180px] rounded-md border border-borders-600 bg-interactive-300 text-solid-900 hover:border-solid-1000 hover:bg-interactive-400 hover:text-solid-1000 focus:border-none focus:outline-none focus:ring-0">
        <ShadcnSelectValue placeholder={placeholder} className="rounded-lg" />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent className="border-none bg-interactive-300 text-accessible-1200 drop-shadow-md">
        <ShadcnSelectGroup>
          {options.map(opt => (
            <ShadcnSelectItem
              className="hover:bg-interactive-400 hover:text-solid-900"
              value={String(opt.value)}
              key={uuidv4()}
            >
              {opt.label}
            </ShadcnSelectItem>
          ))}
          <button
            className="w-full px-2"
            onClick={e => {
              e.stopPropagation();
              onValueChange(null);
            }}
          >
            Clear
          </button>
        </ShadcnSelectGroup>
      </ShadcnSelectContent>
    </ShadcnSelect>
  );
}
