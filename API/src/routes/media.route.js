const express = require('express');
const router = express.Router();
const mediaService = require('../service/media.service');

router.get('', async (req, res) => {
  try {
    const mediaTypes = req.query['mediaType'];
    const result = await mediaService.list(mediaTypes);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await mediaService.get(mediaID);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('', async (req, res) => {
  try {
    const media = req.body;
    const result = await mediaService.add(media);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('', async (req, res) => {
  try {
    const media = req.body;
    const result = await mediaService.update(media);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await mediaService.delete(mediaID);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
