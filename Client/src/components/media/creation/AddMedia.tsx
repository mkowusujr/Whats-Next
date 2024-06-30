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
        <button className="ml-auto w-fit rounded-md border border-gray-400 px-8">
          Add
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-full overflow-y-scroll bg-slate-500 text-white"
      >
        <SheetHeader>
          <SheetTitle>Add Next</SheetTitle>
          <SheetDescription>Add items to your list.</SheetDescription>
        </SheetHeader>
        <Tabs className="flex flex-col" defaultValue="find-next">
          <TabsList className="mx-auto">
            <TabsTrigger value="find-next">Find Next</TabsTrigger>
            <TabsTrigger value="manual-add">Manually Add</TabsTrigger>
          </TabsList>
          <TabsContent value="find-next">
            <FindNext />
          </TabsContent>
          <TabsContent value="manual-add">
            <></>
            {/* <AddMediaManual pageName={''} addToList={() => {}} /> */}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
