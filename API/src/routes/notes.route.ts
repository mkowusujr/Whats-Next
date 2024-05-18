import express from 'express';
const router = express.Router();
import {
  addNote,
  deleteNote,
  getMediaNotes,
  getNote,
  updateNote
} from '@/src/services/notes.service';

router.get('/:noteID', async (req, res) => {
  try {
    const noteID = req.params['noteID'];
    const result = await getNote(Number(noteID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.get('/media/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await getMediaNotes(Number(mediaID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.post('', async (req, res) => {
  try {
    const note = req.body;
    const result = await addNote(note);
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.put('', async (req, res) => {
  try {
    const note = req.body;
    const result = await updateNote(note);
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.delete('/:noteID', async (req, res) => {
  try {
    const noteID = req.params['noteID'];
    const result = await deleteNote(Number(noteID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
