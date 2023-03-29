const router = require ('express').Router()

const controllerAdministrador = require('../src/controllers/controllerAdministrador')

router.route('/').post((req, res) => controllerAdministrador.create(req, res))

router.route('/').get((req, res) => controllerAdministrador.getAll(req, res))

router.route('/:id').get((req, res) => controllerAdministrador.getOne(req, res))

router.route('/:id').put((req, res) => controllerAdministrador.update(req, res))

router.route('/:id').delete((req, res) => controllerAdministrador.delete(req, res))

module.exports = router