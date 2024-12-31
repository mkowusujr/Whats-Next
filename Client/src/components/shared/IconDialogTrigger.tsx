import { DialogTrigger } from '../ui/dialog';

type IconButtonProps = {
  HeroIcon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

export default function IconDialogTrigger({ HeroIcon }: IconButtonProps) {
  return (
    <DialogTrigger>
      <button className="rounded-md border border-borders-600 bg-interactive-300 p-2 text-borders-800 hover:border-solid-1000 hover:bg-interactive-400 hover:text-solid-1000">
        <HeroIcon className="size-4" />
      </button>
    </DialogTrigger>
  );
}
