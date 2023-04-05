const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerArma = {

    //Criar uma nova Arma
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.nomeArma,
                alunoId: parseInt(req.body.alunoId),
                tipo: req.body.tipo,
            }
        
            const findOne = await prisma.aluno.findUnique({where: {idAluno: data.alunoId}})
            if (!findOne) {
                return res.status(400).json({msg: "Aluno não cadastrado!"})
            }
            const newArma = await prisma.arma.create({data})
            res.status(201).json({newArma, msg: "Arma cadastrada com sucesso!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },

    ///Seleciona todos os Alunos
    getAll: async(req, res) => {
        try {
            const allArmas = await prisma.arma.findMany()
            return res.status(200).json(allArmas)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona as armas de apenas 1 aluno
    getOneAluno: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const uniqueAluno = await prisma.arma.findMany({where: {
                alunoId: id
            }, select: {
                id: true,
                nome: true, 
                tipo: true,
                aluno: true
                },
            })
            if (!uniqueAluno) {
                return res.status(404).json({msg: ""})
            }
            return res.status(200).json(uniqueAluno)
        } catch (error) {
           console.log(error) 
        }
    },

    update: async(req, res) => {
        try {
            var id = req.params.id
            
            const data = {
                nome: req.body.nomeArma,
                tipo: req.body.tipo,
            }

            id = parseInt(id)
            const updateArma = await prisma.arma.update({where: {id: id}, data})
            return res.status(200).json({msg: "Arma atualizada!"})
        } catch (err) {
            console.log(err)
        }
    },
    
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const arma = await prisma.arma.findUnique({where: {id: id}})
            if (!arma) {return res.status(404).json({msg: "Arma não encontrada!"})}
            const deletedArma = await prisma.arma.delete({where: {id: id}})
            return res.status(200).json({msg: "Arma excluída!"})
        } catch (err) {
            console.log(err)
        }
    }
} 

module.exports = controllerArma