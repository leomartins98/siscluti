const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerHorario = {

    //Criar um novo horário
    create: async (req, res) => {
        try {
            const data = {
                horaInicio: req.body.horaInicio,
                horaFinal: req.body.horaFinal,
                profId: req.body.profId
            }

            const findHoraInicio = await prisma.horario.findUnique({where: {horaInicio: data.horaInicio}})

            if (findHoraInicio){return res.status(400).json({msg: "Horário já preenchido!"})}

            const newHorario = await prisma.horario.create({data})
            res.status(201).json({newHorario, msg: "Horário cadastrado!"})
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },


    ///Seleciona todos os Horários
    getAll: async(req, res) => {
        try {
            const allHorarios = await prisma.horario.findMany()
            return res.status(200).json(allHorarios)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas o horário dos professores
    gethoursTeacher: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const horarios = await prisma.horario.findMany({where: {profId: id}, select: {horaInicio: true, horaFinal: true}})
            if (!horarios) {
                return res.status(404).json({})
            }
            return res.status(200).json(horarios)
            
        } catch (error) {
           console.log(error) 
        }
    },

    //Atualiza o horário
    update: async(req, res) => {
        try {
            var id = req.params.id
            
            const data = {      
                horaInicio: req.body.horaInicio,      
                horaFinal: req.body.horaFinal,
                profId: req.body.profId
            }

            id = parseInt(id)
            const updateHorario = await prisma.horario.update({where: {idHorario: id}, data})
            return res.status(200).json({updateHorario, msg: "Horário atualizado!"})
        } catch (err) {
            console.log(err)
        }
    },
    
    //Deleta o Horário
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const horario = await prisma.horario.findUnique({where: {idHorario: id}})
            if (!horario) {return res.status(404).json({msg: "Horário não encontrado!"})}
            const deletedHorario = await prisma.horario.delete({where: {idHorario: id}})
            return res.status(200).json({msg: "Horário deletado!"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerHorario