const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerAgendamento = {

    //Criar um novo Agendamento
    create: async (req, res) => {
        try {
            const data = {
                funcId: parseInt(req.body.funcId),
                alunoId: parseInt(req.body.alunoId),
                horaInicioAgendamento: req.body.horaInicioAgendamento,
                horaTerminoAgendamento: req.body.horaTerminoAgendamento
            }

            const findOne = await prisma.agendamento.findUnique({where: {horaInicioAgendamento: data.horaInicioAgendamento}})
            if (findOne){
                return res.status(400).json({msg: "Agendamento já ocorrido!"})
            }

            const newAgd = await prisma.agendamento.create({data})
            res.status(201).json({newAgd, msg: "Agendamento feito!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },


    ///Seleciona todos os Agendamentos
    getAll: async(req, res) => {
        try {
            const allAgd = await prisma.agendamento.findMany()
            return res.status(200).json(allAgd)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas um Agendamento
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const uniqueAgd = await prisma.agendamento.findUnique({where: {idAgendamento: id}})
            if (!uniqueAgd) {
                return res.status(404).json({})
            }
            return res.status(200).json(uniqueAgd)
            
        } catch (error) {
           console.log(error) 
        }
    },
    
    //Deleta o Agendamento
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const agd = await prisma.agendamento.findUnique({where: {idAgendamento: id}})
            if (!agd) {return res.status(404).json({msg: "Agendamento não encontrado!"})}
            const deletedAgd = await prisma.agendamento.delete({where: {idAgendamento: id}})
            return res.status(200).json({msg: "Agendamento cancelado"})
        } catch (err) {
            console.log(err)
        }
    }
} 

module.exports = controllerAgendamento