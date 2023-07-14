const express = require('express');
const router = express.Router();

const notesService = require('../service/notes.service');

router.post('', async (req, res) => {
  const note = req.body;
  const result = await notesService.add(note);
  res.json(result);
});

router.get('/media/:mediaID', async (req, res) => {
  const mediaID = req.params['mediaID'];
  const result = await notesService.listForMedia(mediaID);
  res.json(result);
});

router.get('/books/:bookID', async (req, res) => {
  const bookID = req.params['bookID'];
  const result = await notesService.listForBook(bookID);
  res.json(result);
});

router.put('', async (req, res) => {
  const note = req.body;
  const result = await notesService.update(note);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const noteID = req.params['id'];
  const result = await notesService.delete(noteID);
  res.json(result);
});

module.exports = router;
