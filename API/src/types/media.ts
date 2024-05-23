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
};

export type GetAllMedia = {
  media: media[];
  nextCursor: number;
};
