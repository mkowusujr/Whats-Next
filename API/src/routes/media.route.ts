import express from 'express';
const router = express.Router();
import {
  addMedia,
  deleteMedia,
  findExternalMedia,
  listInternalMedia,
  getMedia,
  updateMedia
} from '../services/media.service';

router.get('/internal', async (req, res) => {
  try {
    const result = await listInternalMedia(req.query as any);
    res.json(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.get('/external', async (req, res) => {
  try {
    const result = await findExternalMedia(req.query as any);
    res.json(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.get('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await getMedia(Number(mediaID));
    res.json(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.post('', async (req, res) => {
  try {
    const media = req.body;
    const result = await addMedia(media);
    res.json(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.put('', async (req, res) => {
  try {
    const media = req.body;
    const result = await updateMedia(media);
    res.json(result);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.delete('/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    await deleteMedia(Number(mediaID));
    res.json('Success');
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

export default router;
