import {
  addProgress,
  deleteProgress,
  getMediaProgress,
  getProgress,
  updateProgress
} from '@/src/services/progress.service';
import express from 'express';
const router = express.Router();

router.get('/:progressID', async (req, res) => {
  try {
    const progressID = req.params['progressID'];
    const result = await getProgress(Number(progressID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.get('/media/:mediaID', async (req, res) => {
  try {
    const mediaID = req.params['mediaID'];
    const result = await getMediaProgress(Number(mediaID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.post('', async (req, res) => {
  try {
    const progress = req.body;
    const result = await addProgress(progress);
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.put('', async (req, res) => {
  try {
    const progress = req.body;
    const result = await updateProgress(progress);
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.delete('/:progressID', async (req, res) => {
  try {
    const progressID = req.params['progressID'];
    const result = await deleteProgress(Number(progressID));
    res.json(result);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
