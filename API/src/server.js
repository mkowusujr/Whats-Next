const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const mediaRoutes = require('./routes/media.route');
const notesRoutes = require('./routes/notes.route');
const bookRoutes = require('./routes/book.route');
const summaryRoutes = require('./routes/summary.route');
const imageRoutes = require('./routes/imgs.route')
const database = require('./database');

database.setupDb();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

app.use(cors());
app.use('/media', mediaRoutes);
app.use('/notes', notesRoutes);
app.use('/books', bookRoutes);
app.use('/summary', summaryRoutes);
app.use('/imgs', imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
