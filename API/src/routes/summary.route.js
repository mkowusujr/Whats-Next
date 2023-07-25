const express = require('express');
const router = express.Router();
const summaryService = require('../service/summary.service');

router.get('', async (req, res) => {
  const result = await summaryService.getSummary();
  res.json(result);
});

module.exports = router;
