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
  placeholder: string;
};

export default function Select({
  value,
  onValueChange,
  options,
  placeholder
}: Props) {
  return (
    <ShadcnSelect value={value} onValueChange={onValueChange}>
      <ShadcnSelectTrigger className="w-[180px]">
        <ShadcnSelectValue placeholder={placeholder} />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        <ShadcnSelectGroup>
          {options.map(opt => (
            <ShadcnSelectItem value={String(opt.value)} key={uuidv4()}>
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
