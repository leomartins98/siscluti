const router = require ('express').Router()

const controllerFuncionario = require('../src/controllers/controllerFuncionario')

router.route('/').post((req, res) => controllerFuncionario.create(req, res))

router.route('/').get((req, res) => controllerFuncionario.getAll(req, res))

router.route('/:id').get((req, res) => controllerFuncionario.getOne(req, res))

router.route('/:id').put((req, res) => controllerFuncionario.update(req, res))

router.route('/:id').delete((req, res) => controllerFuncionario.delete(req, res))

module.exports = router