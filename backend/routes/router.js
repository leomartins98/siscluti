const router = require('express').Router()

const admRouter = require('./administrador')

router.use('/', admRouter)

module.exports = router