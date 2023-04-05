const router = require ('express').Router()
const controllerPessoa = require('../src/controllers/controllerPessoa')

router.route('/').get((req, res) => controllerPessoa.getAll(req, res))

module.exports = router