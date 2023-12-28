const express = require('express');
const router = express.Router();
const progressService = require('../service/progress.service');

router.get('/:progressID', async (req, res) => {
  try {
    const progressID = req.params['progressID'];
    const result = await progressService.get(progressID);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.get('/media/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await progressService.getFor(mediaID);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.post('', async (req, res) => {
  try {
    const progress = req.body.progress;
    const result = await progressService.add(progress);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.put('', async (req, res) => {
  try {
    const progress = req.body;
    const result = await progressService.update(progress);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

router.delete('/:progressID', async (req, res) => {
  try {
    const progressID = req.params['progressID'];
    const result = await progressService.delete(progressID);
    res.json(result);
  }
  catch (err) {
    res.send(err)
  }
});

module.exports = router;
