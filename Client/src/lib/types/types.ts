type Media = {
  id: number;
  title: string;
  subTitle: string;
  summary: string;
  score: number;
  status: string;
  storage: string;
  releaseDate: string;
  creator: string;
  img: string;
  mediaType: string;
  link: string;
  dateStarted: string;
  dateCompleted: string;
};

type CreatedMedia = {
  title: string;
  subTitle: string;
  mediaType: string;
  score: number;
  status: string;
  link: string;
};

type Filter = {
  name: string;
  mediaTypes: string[];
  score: string;
  status: string;
  sortBy: string;
  isAsc: boolean;
};

type Note = {
  id: number;
  title: string;
  content: string;
  mediaID: number;
  dateCreated: string;
  dateLastUpdated: string;
};

type CreatedNote = {
  title: string;
  content: string;
  mediaID: number;
};

type UpdatedNote = {
  id: number;
  title: string;
  content: string;
};

type Progress = {
  id: number;
  title: string;
  current: number;
  total: number;
  unit: string;
  dateStarted: string;
  dateCompleted: string;
  mediaID: number;
};

type CreatedProgress = {
  title: string;
  current: number;
  total: number;
  unit: string;
  dateStarted: string;
  dateCompleted: string;
  mediaID: number;
};

type UpdatedProgress = {
  title: string;
  current: number;
  total: number;
  unit: string;
  dateStarted: string;
  dateCompleted: string;
  mediaID: number;
};

type RemoveFromList = (id: number) => void;
type UpdateList<Type> = (item: Type) => void;
type AddToList<Type> = (item: Type) => void;

type Summary = {
  completed: Media[];
  inprogress: Media[];
  planned: Media[];
  notes: Note[];
};
