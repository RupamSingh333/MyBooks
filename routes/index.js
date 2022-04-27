const book = require('./bookRoutes')
const users = require('./usersRoutes')
const express = require('express')
const router = express.Router()

router.use('/api/v1/books', book);
router.use('/api/v1/users', users);

module.exports = router;