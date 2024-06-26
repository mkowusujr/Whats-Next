import { media } from '@prisma/client';

export type Media = {
  id: number;
  title: string;
  subTitle: string;
  mediaType: string;
  score: number;
  imgLink: string;
  creator: string;
  summary: string;
  releaseDate: string;
  mediaLink: string;
  status: string;
  duration: string;
};

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
