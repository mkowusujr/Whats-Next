import { Note } from '@/src/types/notes';
import { prisma } from '@/src/lib/prisma';

/** Adds a new note to the database. */
export const addNote = async (note: Note) => {
  const createdNote = await prisma.note.create({
    data: {
      title: note.title,
      content: note.content,
      media: {
        connect: {
          id: note.mediaID
        }
      }
    }
  });

  return createdNote;
};

/** Retrieves a note from the database based on note ID. */
export const getNote = async (noteID: number) => {
  const note = await prisma.note.findFirstOrThrow({
    where: { id: noteID, isDeleted: false },
    include: { media: true }
  });

  return note;
};

/** Retrieves a list of all notes from the database. */
export const getAllNotes = async () => {
  const notes = await prisma.note.findMany({
    include: { media: true }
  });
  return notes;
};

/**
 * Retrieves a list of notes associated with a specific media ID from
 * the database.
 */
export const getMediaNotes = async (mediaID: number) => {
  const notes = await prisma.note.findMany({
    where: { mediaID: mediaID },
    orderBy: { createdAt: 'desc' }
  });
  return notes;
};

/** Updates a note in the database. */
export const updateNote = async (note: Note) => {
  const updatedNote = await prisma.note.update({
    where: { id: note.id },
    data: note
  });
  return updatedNote;
};

/** Deletes a note from the database based on note ID. */
export const deleteNote = async (noteID: number) => {
  await prisma.note.update({
    where: { id: noteID },
    data: { isDeleted: true }
  });
  return { message: 'Successfully deleted note ' + noteID };
};
