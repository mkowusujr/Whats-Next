const express = require('express');
const router = express.Router();
const notesService = require('../service/notes.service');

router.get('', async (req, res) => {
  try {
    const result = await notesService.list();
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:noteID', async (req, res) => {
  try {
    const noteID = req.params['noteID'];
    const result = await notesService.get(noteID);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/media/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await notesService.listForMedia(mediaID);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('', async (req, res) => {
  try {
    const note = req.body;
    const result = await notesService.add(note);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('', async (req, res) => {
  try {
    const note = req.body;
    const result = await notesService.update(note);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:noteID', async (req, res) => {
  try {
    const noteID = req.params['noteID'];
    const result = await notesService.delete(noteID);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
