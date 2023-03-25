const router = require ('express').Router()

const controllerArma = require('../src/controllers/controllerArma')

router.route('/').post((req, res) => controllerArma.create(req, res))

router.route('/').get((req, res) => controllerArma.getAll(req, res))

router.route('/:id').get((req, res) => controllerArma.getOneAluno(req, res))

router.route('/:id').put((req, res) => controllerArma.update(req, res))

router.route('/:id').delete((req, res) => controllerArma.delete(req, res))

module.exports = router