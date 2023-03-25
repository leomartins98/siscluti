const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerProfessor = {

    //Criar um novo ADM
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                salario: parseFloat(req.body.salario),
                horarioId: req.body.horarioId,
                localId: req.body.localId
            }
            const findCpf = await prisma.professor.findUnique({where: {cpf: data.cpf}})
            if (findCpf) {return res.status(400).json({msg: "CPF já cadastrado!"})}

            const newProfessor = await prisma.professor.create({data})

            res.status(201).json({newProfessor, msg: "Professor cadastrado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    },


    ///Seleciona todos os ADM's
    getAll: async(req, res) => {
        try {
            const allProfs = await prisma.professor.findMany()
            return res.status(200).json(allProfs)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas um ADM
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const prof = await prisma.professor.findUnique({where: {idProf: id}})
            if (!prof) {
                return res.status(404).json({msg: "Professor não encontrado!"})
            }
            return res.status(200).json(prof)
            
        } catch (error) {
           console.log(error) 
        }
    },
    
    //Deleta o Professor
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const prof = await prisma.funcionario.findUnique({where: {idProf: id}})
            if (!prof) {return res.status(404).json({msg: "Professor não encontrado!"})}
            const deletedProf = await prisma.professor.delete({where: {idProf: id}})
            return res.status(200).json({msg: "Professor deletado"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerProfessor