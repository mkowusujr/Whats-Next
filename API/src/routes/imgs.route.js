const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/books/:bookID', async (req, res) => {
  const bookID = req.params['bookID'];
  const options = {
    root: path.join(__dirname, '../../data/images/books')
  };
  res.sendFile(`${bookID}.jpg`, options);
});

router.post('/books', async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const reqFiles = req.files;
  let uploadFile = reqFiles.file;
  const fileName = req.files.file.name;
  uploadFile.mv(
    `${__dirname}/../../data/images/books/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        file: `public/${req.files.file.name}`
      });
    }
  );
});

module.exports = router;
