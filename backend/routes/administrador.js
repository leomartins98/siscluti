const router = require ('express').Router()

const controllerAdministrador = require('../src/controllers/controllerAdministrador')

router.route('/administrador').post((req, res) => controllerAdministrador.create(req, res))

router.route('/administrador').get((req, res) => controllerAdministrador.getAll(req, res))

router.route('/administrador/:id').get((req, res) => controllerAdministrador.getOne(req, res))

router.route('/administrador/:id').delete((req, res) => controllerAdministrador.delete(req, res))

module.exports = router