import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mediaRoutes from '@/src/routes/media.route';
import noteRoutes from '@/src/routes/notes.route';
import progressRoutes from '@/src/routes/progress.route';

const app = express(),
  port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/media', mediaRoutes);
app.use('/notes', noteRoutes);
app.use('/progress', progressRoutes);
// app.use('/summary', summaryRoutes);

/**
 * Start the Express server on the specified port.
 */
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
