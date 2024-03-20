import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react';

import CarouselMediaItem from '@/components/summary/CarouselMediaItem';
import CarouselNoteItem from '@/components/summary/CarouselNoteItem';
import WhatsNextCarousel from '@/components/summary/WhatsNextCarousel';
import { getSummary } from '@/lib/data/summary';
import { Dialog, DialogContent } from '@/components/common/Dialog';
import Badge from '@/components/common/Badge';

type SummaryPageDialogContextProps = {
  contents: ReactNode;
  setContents: React.Dispatch<React.SetStateAction<ReactNode>>;
};

const defaultSummaryPageDialogContext: SummaryPageDialogContextProps = {
  contents: null,
  setContents: () => {}
};

export const SummaryPageDialogContext =
  createContext<SummaryPageDialogContextProps>(defaultSummaryPageDialogContext);

/** The landing page */
export default function WhatsNextPage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  const [contents, setContents] = useState<ReactNode>(null);

  useEffect(() => {
    document.title = "What's Next?";
    getSummary()
      .then(s => setSummary(s!))
      .catch(err => console.log(err));
  }, []);

  const StatsOverview = useCallback(
    ({ labels }: { labels: string[] }) => (
      <div className="my-2 flex flex-wrap justify-between">
        {labels.map((label, index) => (
          <Badge key={index} className="m-2 rounded-md" label={label} />
        ))}
      </div>
    ),
    []
  );

  const InProgressSection = useCallback(
    () =>
      summary && (
        <div className="mb-4 h-fit break-inside-avoid-column rounded-md border-2 border-accent bg-base-300 p-2">
          <h2 className="flex justify-center text-3xl font-semibold text-primary">
            <span className="my-auto">In Progress</span>
            <Badge label={summary.stats.totalMediaInProgress} />
          </h2>
          <StatsOverview
            labels={[
              `Series ${summary.stats.totalSeriesInProgress}`,
              `Movies ${summary.stats.totalMoviesInProgress}`,
              `Comics ${summary.stats.totalGraphicNovelsInProgress}`,
              `Books ${summary.stats.totalGraphicNovelsInProgress}`
            ]}
          />
          <WhatsNextCarousel
            items={summary.inprogress}
            SlideComponent={CarouselMediaItem}
          />
        </div>
      ),
    [summary]
  );

  const PlannedSection = useCallback(
    () =>
      summary && (
        <div className="mb-4 h-fit break-inside-avoid-column rounded-md border-2 border-accent bg-base-300 p-2">
          <h2 className="flex justify-center text-3xl font-semibold text-primary">
            <span className="my-auto">{`What's Next?`}</span>
            <Badge label={summary.stats.totalMediaPlanned} />
          </h2>
          <StatsOverview
            labels={[
              `Series ${summary.stats.totalSeriesPlanned}`,
              `Movies ${summary.stats.totalMoviesPlanned}`,
              `Comics ${summary.stats.totalGraphicNovelsPlanned}`,
              `Books ${summary.stats.totalFictionPlanned}`
            ]}
          />
          <WhatsNextCarousel
            items={summary.planned}
            SlideComponent={CarouselMediaItem}
          />
        </div>
      ),
    [summary]
  );

  const HoldSection = useCallback(
    () =>
      summary && (
        <div className="mb-4 h-fit break-inside-avoid-column rounded-md border-2 border-accent bg-base-300 p-2">
          <h2 className="flex justify-center text-3xl font-semibold text-primary">
            <span className="my-auto">On Hold</span>
            <Badge label={summary.stats.totalMediaOnHold} />
          </h2>
          <StatsOverview
            labels={[
              `Series ${summary.stats.totalSeriesOnHold}`,
              `Movies ${summary.stats.totalMoviesOnHold}`,
              `Comics ${summary.stats.totalGraphicNovelsOnHold}`,
              `Books ${summary.stats.totalFictionOnHold}`
            ]}
          />
        </div>
      ),
    [summary]
  );

  const CompletedSection = useCallback(
    () =>
      summary && (
        <div className="mb-4 h-fit break-inside-avoid-column rounded-md border-2 border-accent bg-base-300 p-2">
          <h2 className="flex justify-center text-3xl font-semibold text-primary">
            <span className="my-auto">Completed</span>
            <Badge label={summary.stats.totalMediaCompleted} />
          </h2>
          <StatsOverview
            labels={[
              `Series ${summary.stats.totalSeriesCompleted}`,
              `Movies ${summary.stats.totalMoviesCompleted}`,
              `Comics ${summary.stats.totalGraphicNovelsCompleted}`,
              `Books ${summary.stats.totalFictionCompleted}`
            ]}
          />
          <h3 className="text-center text-xl font-semibold text-primary">
            Recently Commpleted
          </h3>
          <WhatsNextCarousel
            items={summary.completed}
            SlideComponent={CarouselMediaItem}
          />
        </div>
      ),
    [summary]
  );

  const NotesSection = useCallback(
    () =>
      summary && (
        <div className="mb-4 h-fit break-inside-avoid-column rounded-md border-2 border-accent bg-base-300 p-2">
          <h2 className="text-center text-3xl font-semibold text-primary">
            {'Recent Notes'}
          </h2>
          <WhatsNextCarousel
            items={summary.notes}
            SlideComponent={CarouselNoteItem}
          />
        </div>
      ),
    [summary]
  );

  return (
    <SummaryPageDialogContext.Provider value={{ contents, setContents }}>
      <Dialog>
        <DialogContent>
          <div className="bg-base-300 p-6">{contents}</div>
        </DialogContent>
        <div className="columns-1 p-12 sm:px-14 md:columns-2 md:px-16">
          <InProgressSection />
          <PlannedSection />
          <HoldSection />
          <CompletedSection />
          <NotesSection />
        </div>
      </Dialog>
    </SummaryPageDialogContext.Provider>
  );
}
