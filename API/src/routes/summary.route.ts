import express from 'express';
import { getSummary } from '../services/summary.service';

const router = express.Router();

router.get('', async (_, res) => {
  const result = await getSummary();
  res.json(result);
});

export default router;
