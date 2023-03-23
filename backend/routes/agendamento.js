const router = require ('express').Router()

const controllerAgendamento = require('../src/controllers/controllerAgendamento')

router.route('/').post((req, res) => controllerAgendamento.create(req, res))

router.route('/').get((req, res) => controllerAgendamento.getAll(req, res))

router.route('/:id').get((req, res) => controllerAgendamento.getOne(req, res))

router.route('/:id').delete((req, res) => controllerAgendamento.delete(req, res))

module.exports = router