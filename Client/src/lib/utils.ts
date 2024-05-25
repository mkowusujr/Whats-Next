import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaFullTitle(media: Media | ExternalMedia): string;
export function getMediaFullTitle(title: string, subTitle?: string): string;
export function getMediaFullTitle(mediaOrTitle: Media | ExternalMedia | string, subTitle?: string): string {
  if (typeof mediaOrTitle === 'string') {
    const title = mediaOrTitle;
    return (title + ' ' + (subTitle ?? '')).trim();
  } else {
    const media = mediaOrTitle as Media;
    return (media.title + ' ' + (media.subTitle ?? '')).trim();
  }
}