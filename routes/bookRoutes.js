const express = require('express')
const router = express.Router()
const bookControllers = require('../controllers/BookController')
const bookValidator = require('../validators/bookValidators')
const fileUpload = require("../middleware/fileUpload");

router.post('/createBook', fileUpload.imageUpload.single("book_image"), bookValidator.createBook, bookControllers.insertBook);
router.get('/deleteBook', bookValidator.deleteBook, bookControllers.removeBook);
router.get('/viewAll', bookControllers.viewAll);
router.get("/searchBook", bookControllers.searchBook)
router.delete('/deleteBook', bookValidator.deleteBooks, bookControllers.deleteBook);
router.put('/updateBook',bookValidator.updateBook, bookControllers.updateBook);

module.exports = router