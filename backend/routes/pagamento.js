const router = require ('express').Router()

const controllerPagamento = require('../src/controllers/controllerPagamento')

router.route('/').post((req, res) => controllerPagamento.create(req, res))

router.route('/').get((req, res) => controllerPagamento.getAll(req, res))

router.route('/:id').get((req, res) => controllerPagamento.getpaymentsStudent(req, res))

router.route('/edit/:id').put((req, res) => controllerPagamento.update(req, res))

router.route('/:id').put((req, res) => controllerPagamento.alterPendentPayment(req, res))

router.route('/:id').delete((req, res) => controllerPagamento.delete(req, res))

module.exports = router