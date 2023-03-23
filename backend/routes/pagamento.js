const router = require ('express').Router()

const controllerPagamento = require('../src/controllers/controllerPagamento')

router.route('/').post((req, res) => controllerPagamento.create(req, res))

router.route('/').get((req, res) => controllerPagamento.getAll(req, res))

router.route('/:id').get((req, res) => controllerPagamento.getOne(req, res))

router.route('/:id').delete((req, res) => controllerPagamento.delete(req, res))

module.exports = router