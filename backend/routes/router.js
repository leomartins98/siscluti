const router = require('express').Router()

const admRouter = require('./administrador')
const localRouter = require('./local')
const professorRouter = require('./professor')
const alunoRouter = require('./aluno')
const armaRouter = require('./arma')
const agendamentoRouter = require('./agendamento')
const funcionarioRouter = require('./funcionario')
const horarioRouter = require('./horario')
const pagamentoRouter = require('./pagamento')

router.use('/administrador', admRouter)
router.use('/local', localRouter)
router.use('/professor', professorRouter)
router.use('/aluno', alunoRouter)
router.use('/arma', armaRouter)
router.use('/agendamento', agendamentoRouter)
router.use('/funcionario', funcionarioRouter)
router.use('/horario', horarioRouter)
router.use('/pagamento', pagamentoRouter)

module.exports = router