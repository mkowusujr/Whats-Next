const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  expressLogging = require('express-logging'),
  logger = require('logops');

const mediaRoutes = require('./routes/media.route'),
  notesRoutes = require('./routes/notes.route'),
  summaryRoutes = require('./routes/summary.route'),
  progressRoutes = require('./routes/progress.route');

const app = express(),
  port = 3000,
  database = require('./database');

database.setupDb();

app.use(cors());
app.use(bodyParser.json());
app.use(expressLogging(logger));

app.use('/media', mediaRoutes);
app.use('/notes', notesRoutes);
app.use('/summary', summaryRoutes);
app.use('/progress', progressRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
