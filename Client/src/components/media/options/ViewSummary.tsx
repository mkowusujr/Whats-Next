import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export const ViewSummary = ({ mediaSummary }: { mediaSummary: string }) => (
  <div>
    <Dialog>
      <DialogTrigger asChild>
        <button className="mb-auto">
          <InformationCircleIcon className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-72 rounded-md bg-base-300 p-6 text-2xl text-primary sm:w-[500px] lg:w-[800px]">
        <p>{mediaSummary}</p>
      </DialogContent>
    </Dialog>
  </div>
);
