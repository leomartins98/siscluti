const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerAluno = {

    //Criar um novo Aluno
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                nasc: req.body.nasc,
                localId: req.body.localId,
                profId: req.body.professorId
            }
            const findOne = await prisma.aluno.findUnique({where: {nome: data.nome}})
            if (findOne) {
                return res.status(400).json({msg: "Aluno já cadastrado!"})
            }
            const newAluno = await prisma.aluno.create({data})
            res.status(201).json({newAluno, msg: "Aluno cadastrado com sucesso!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },

    ///Seleciona todos os Alunos
    getAll: async(req, res) => {
        try {
            const allAlunos = await prisma.aluno.findMany()
            return res.status(200).json(allAlunos)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas um Aluno
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const uniqueAluno = await prisma.aluno.findUnique({where: {idAluno: id}})
            if (!uniqueAluno) {
                return res.status(404).json({})
            }
            return res.status(200).json(uniqueAluno)
            
        } catch (error) {
           console.log(error) 
        }
    },

    //Atualiza o aluno
    update: async (req, res) => {
        try {

            const id = parseInt(req.params.id)

            const data = {
                nome: req.body.nome,
                nasc: req.body.nasc,
                localId: req.body.localId,
                profId: req.body.professorId
            }
            const findOne = await prisma.aluno.findUnique({where: {nome: data.nome}})
            if (!findOne) {
                return res.status(400).json({msg: "Aluno não encontrado!"})
            }
            const newAluno = await prisma.aluno.update({where: {idAluno: id}, data})
            res.status(201).json({newAluno, msg: "Aluno atualizado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },
    
    //Deleta o Aluno
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const aluno = await prisma.aluno.findUnique({where: {idAluno: id}})
            if (!aluno) {return res.status(404).json({msg: "Aluno não encontrado!"})}
            const deletedAluno = await prisma.aluno.delete({where: {idAluno: id}})
            return res.status(200).json({msg: "Aluno excluído!"})
        } catch (err) {
            console.log(err)
        }
    }
} 

module.exports = controllerAluno