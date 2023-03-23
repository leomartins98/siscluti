const router = require ('express').Router()

const controllerLocal = require('../src/controllers/controllerLocal')

router.route('/').post((req, res) => controllerLocal.create(req, res))

router.route('/').get((req, res) => controllerLocal.getAll(req, res))

router.route('/:id').get((req, res) => controllerLocal.getOne(req, res))

router.route('/:id').delete((req, res) => controllerLocal.delete(req, res))

module.exports = router
