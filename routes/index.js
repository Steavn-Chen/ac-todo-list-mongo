const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const todos = require('./modules/todos.js')
const users = require('./modules/users.js')

const { authenticated } = require('../middleware/auth.js')

router.use('/todos', authenticated, todos)
router.use('/users', users)
router.use('/', authenticated, home)

module.exports = router