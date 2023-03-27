const router = require ('express').Router()

const controllerProfessor = require('../src/controllers/controllerProfessor')

router.route('/').post((req, res) => controllerProfessor.create(req, res))

router.route('/').get((req, res) => controllerProfessor.getAll(req, res))

router.route('/:id').get((req, res) => controllerProfessor.getOne(req, res))

router.route('/:id').delete((req, res) => controllerProfessor.delete(req, res))

module.exports = router