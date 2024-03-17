export const getMediaFullTitle = (media: Media) =>
  (media.title + ' ' + (media.subTitle ?? '')).trim();
