const router = require ('express').Router()

const controllerAluno = require('../src/controllers/controllerAluno')

router.route('/').post((req, res) => controllerAluno.create(req, res))

router.route('/').get((req, res) => controllerAluno.getAll(req, res))

router.route('/:id').get((req, res) => controllerAluno.getOne(req, res))

router.route('/:id').put((req, res) => controllerAluno.update(req, res))

router.route('/:id').delete((req, res) => controllerAluno.delete(req, res))

module.exports = router