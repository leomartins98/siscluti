const router = require ('express').Router()

const controllerProfessor = require('../src/controllers/controllerProfessor')

router.route('/local').post((req, res) => controllerProfessor.create(req, res))

router.route('/local').get((req, res) => controllerProfessor.getAll(req, res))

router.route('/local/:id').get((req, res) => controllerProfessor.getOne(req, res))

router.route('/local/:id').delete((req, res) => controllerProfessor.delete(req, res))

module.exports = router