const express = require("express");
const router = express.Router();
const mediaService = require("../service/media.service");

router.post("", async (req, res) => {
  const media = req.body;
  const result = await mediaService.add(media);
  res.json(result);
});

router.get("", async (req, res) => {
  // const filters = req.body;
  const result = await mediaService.list({});
  res.json(result);
});

router.put("", async (req, res) => {
  const media = req.body;
  const result = await mediaService.update(media);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const mediaID = req.params['id'];
  const result = await mediaService.delete(mediaID);
  res.json(result);
})

module.exports = router;
