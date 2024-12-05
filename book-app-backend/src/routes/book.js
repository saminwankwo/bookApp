const express = require('express');

const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getBookByUser, addBook, getBooks, getBook } = require('../controller/book');


router.post('/addBook', verifyToken, addBook)

//get all books
router.get('/getBooks', getBooks)

router.get('/getBook/:id', verifyToken, getBook)

//get my books
router.get('getBook', verifyToken, getBookByUser)

module.exports = router;
