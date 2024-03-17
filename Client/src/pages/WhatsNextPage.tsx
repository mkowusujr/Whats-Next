import { ReactNode, createContext, useEffect, useState } from 'react';

import CarouselMediaItem from '@/components/summary/CarouselMediaItem';
import CarouselNoteItem from '@/components/summary/CarouselNoteItem';
import WhatsNextCarousel from '@/components/summary/WhatsNextCarousel';
import { getSummary } from '@/lib/data/summary';
import { Dialog, DialogContent } from '@/components/common/Dialog';

type SummaryPageDialogContextProps = {
  contents: ReactNode;
  setContents: React.Dispatch<React.SetStateAction<ReactNode>>;
};

const defaultSummaryPageDialogContext: SummaryPageDialogContextProps = {
  contents: <div>Hi</div>,
  setContents: () => {}
};

export const SummaryPageDialogContext =
  createContext<SummaryPageDialogContextProps>(defaultSummaryPageDialogContext);

/** The landing page */
export default function WhatsNextPage() {
  const [summary, setSummary] = useState<Summary>({
    completed: [],
    inprogress: [],
    planned: [],
    notes: []
  });

  // const [dialogContents, setDialogContent] = useState<ReactNode>();
  const [contents, setContents] = useState<ReactNode>(<div>Hi</div>);
  useEffect(() => {
    document.title = "What's Next?";
    getSummary()
      .then(s => setSummary(s!))
      .catch(err => console.log(err));
  }, []);

  return (
    <SummaryPageDialogContext.Provider value={{ contents, setContents }}>
      <Dialog>
        <DialogContent>
          <div className="w-72 rounded-md bg-white/80 p-6 text-2xl text-black backdrop-blur-sm sm:w-[500px] lg:w-[800px]">
            {contents}
          </div>
        </DialogContent>
        <div className="flex flex-col gap-4 p-12 sm:px-14 md:px-16 lg:grid lg:grid-cols-2">
          <WhatsNextCarousel
            title="In Progress"
            items={summary.inprogress}
            SlideComponent={CarouselMediaItem}
          />
          <WhatsNextCarousel
            title={`What's Next?`}
            items={summary.planned}
            SlideComponent={CarouselMediaItem}
          />
          <WhatsNextCarousel
            title="Recently Completed"
            items={summary.completed}
            SlideComponent={CarouselMediaItem}
          />
          <WhatsNextCarousel
            title="Recent Notes"
            items={summary.notes}
            SlideComponent={CarouselNoteItem}
          />
        </div>
      </Dialog>
    </SummaryPageDialogContext.Provider>
  );
}
