const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mediaRoutes = require('./routes/media.route');
const notesRoutes = require('./routes/notes.route');
const database = require('./database');

database.setupDb();
app.use(express.json());
app.use(cors());
app.use('/media', mediaRoutes);
app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
