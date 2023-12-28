const express = require('express');
const router = express.Router();
const progressService = require('../service/progress.service');


router.get('/:progressID', async (req, res) => {
	const progressID = req.params['progressID'];
  const result = await progressService.get(progressID);
  res.json(result);
});

router.delete('/:progressID', async (req, res) => {
  const progressID = req.params['progressID'];
  const result = await progressService.delete(progressID);
  res.json(result);
});

router.put('', async (req, res) => {
  const progress = req.body;
  const result = await progressService.update(progress);
  res.json(result);
});

router.post('', async (req, res) => {
  const type = req.body.type;
  const itemID = req.body.itemID;
  const progress = req.body.progress;
  const result = await progressService.add(type, itemID, progress);
  res.json(result);
});

module.exports = router;
