import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogTrigger,
  DialogContent
} from '@/components/common/Dialog';

export const ViewSummary = ({ media }: { media: Media }) => (
  <div>
    <Dialog>
      <DialogTrigger>
        <button>
          <InformationCircleIcon className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <p className="w-72 rounded-md bg-base-300 p-6 text-2xl text-primary sm:w-[500px] lg:w-[800px]">
          {media.summary}
        </p>
      </DialogContent>
    </Dialog>
  </div>
);
