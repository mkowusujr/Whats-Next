const express = require('express');
const router = express.Router();
const bookService = require('../service/book.service')

router.post('', async (req, res) => {
	const book = req.body
	const result = await bookService.add(book)
	res.json(result)
})

router.get('', async (req, res) => {
  const result = await bookService.list();
  res.json(result);
});

router.put('', async (req, res) => {
  const book = req.body;
  const result = await bookService.update(book);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const bookID = req.params['id'];
  const result = await bookService.delete(bookID);
  res.json(result);
});

module.exports = router;
