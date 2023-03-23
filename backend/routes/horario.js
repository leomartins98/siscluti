const router = require ('express').Router()

const controllerHorario = require('../src/controllers/controllerHorario')

router.route('/').post((req, res) => controllerHorario.create(req, res))

router.route('/').get((req, res) => controllerHorario.getAll(req, res))

router.route('/:id').get((req, res) => controllerHorario.getOne(req, res))

router.route('/:id').delete((req, res) => controllerHorario.delete(req, res))

module.exports = router