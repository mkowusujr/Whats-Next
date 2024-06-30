import { media } from '@prisma/client';
import { Progress } from './progress';

export type Media = {
  id: number;
  title: string;
  subTitle: string;
  summary: string;
  currentProgress: Progress
  storage: string;
  releaseDate: string;
  creator: string;
  mediaType: MediaType;
  imgLink: string;
  mediaLink: string;
  dateStarted: string;
  dateCompleted: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatedMedia = {
  title: string;
  subTitle: string;
  mediaType: string;
  score: number;
  status: string;
  duration?: string
  imgLink?: string;
  creator?: string;
  summary?: string;
  releaseDate?: string;
  mediaLink?: string;
  categories?: string[];
};

export type MediaType = {
  id: number;
  mediaType: string;
}

export const ProgressUnits = {
  SERIES: "Episodes",
  MOVIE: "Minutes",
  BOOK: "Chapters",
} as const;
export type ProgressUnitsType = typeof ProgressUnits[keyof typeof ProgressUnits];
export type ProgressUnitKeys = keyof typeof ProgressUnits;

export enum ProgressStatuses {
  PLANNED = "Planned",
  INPROGRESS = "In Progress",
  COMPLETED = "Completed",
  ONHOLD = "On Hold"
}

export type GetAllMedia = {
  media: media[];
  nextCursor: number;
};
