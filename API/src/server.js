const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');

const mediaRoutes = require('./routes/media.route'),
  notesRoutes = require('./routes/notes.route'),
  summaryRoutes = require('./routes/summary.route'),
  progressRoutes = require('./routes/progress.route');

const app = express(),
  port = 3000,
  database = require('./database');

/**
 * Set up the database by creating necessary tables if they do
 * not exist.
 */
database.setupDb();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/media', mediaRoutes);
app.use('/notes', notesRoutes);
app.use('/summary', summaryRoutes);
app.use('/progress', progressRoutes);

/**
 * Start the Express server on the specified port.
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
