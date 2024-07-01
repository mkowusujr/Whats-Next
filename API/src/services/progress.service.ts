import { Progress } from '@/src/types/progress';
import { prisma } from '@/src/lib/prisma';

/** Updates progress information in the database. */
export const updateProgress = async (progress: Progress) => {
  const updatedProgress = await prisma.progress.update({
    where: { id: progress.id },
    data: progress
  });
  return updatedProgress;
};

/** Retrieves progress information from the database based on progress ID. */
export const getProgress = async (progressID: number) => {
  const progress = await prisma.progress.findFirstOrThrow({
    where: { id: progressID, isDeleted: false }
  });
  return progress;
};

/** Retrieves progress information from the database based on media ID. */
export const getMediaProgress = async (mediaID: number) => {
  const notes = await prisma.progress.findMany({
    where: { mediaID: mediaID, isDeleted: false },
    orderBy: { createdAt: 'desc' }
  });
  return notes;
};

/** Deletes progress information from the database based on progress ID. */
export const deleteProgress = async (progressID: number) => {
  await prisma.progress.update({
    where: { id: progressID },
    data: { isDeleted: true }
  });
  return { message: 'Successfully deleted progress ' + progressID };
};

/**  Adds progress information to the database. */
export const addProgress = async (progress: Progress) => {
  const createdProgress = await prisma.progress.create({
    data: {
      title: progress.title,
      current: progress.current,
      total: progress.total,
      unit: progress.unit,
      status: progress.status,
      dateStarted: progress.dateStarted,
      dateCompleted: progress.dateCompleted,
      media: {
        connect: {
          id: progress.mediaID
        }
      }
    }
  });
  return createdProgress;
};
