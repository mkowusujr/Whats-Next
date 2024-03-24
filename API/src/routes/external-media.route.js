const express = require('express');
const router = express.Router();
const externalMediaService = require('../service/external-media.service');

router.get('', async (req, res) => {
	try {
		const query = req.query['q'];
		const mediaType = req.query["t"]
		const result = await externalMediaService.searchExternally(query, mediaType);
		res.json(result);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
