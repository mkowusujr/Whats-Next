const express = require('express');
const router = express.Router();
const mediaService = require('../service/media.service');

router.get('', async (req, res) => {
  try {
    const result = await mediaService.list();
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.get('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await mediaService.get(mediaID);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.post('', async (req, res) => {
  try {
    const media = req.body;
    const result = await mediaService.add(media);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
})

router.put('', async (req, res) => {
  try {
    const media = req.body;
    const result = await mediaService.update(media);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.delete('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await mediaService.delete(mediaID);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

module.exports = router;
