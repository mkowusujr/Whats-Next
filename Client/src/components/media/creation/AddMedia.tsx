import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FindNext from '@/components/media/creation/FindNext';
import AddMediaManual from './AddMediaManual';

export default function AddMedia() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="ml-auto w-fit rounded-md bg-solid-900 px-8 text-interactive-300 hover:bg-solid-1000">
          Add
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-full overflow-y-scroll bg-gradient-to-b from-base-200 to-base-100 text-accessible-1200"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl">Add Next</SheetTitle>
          <SheetDescription>Add items to your list</SheetDescription>
        </SheetHeader>
        <Tabs className="flex flex-col" defaultValue="find-next">
          <TabsList className="mx-auto bg-interactive-300">
            <TabsTrigger
              value="find-next"
              className="data-[state=active]:bg-interactive-400"
            >
              Find Next
            </TabsTrigger>
            <TabsTrigger
              value="manual-add"
              className="data-[state=active]:bg-interactive-400"
            >
              Manually Add
            </TabsTrigger>
          </TabsList>
          <TabsContent value="find-next">
            <FindNext />
          </TabsContent>
          <TabsContent value="manual-add">
            <AddMediaManual />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
