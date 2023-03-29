const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerLocal = {

    //Criar um novo Local
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                adm: req.body.adm
            }
            
            const findOne = await prisma.local.findUnique({where: {nome: data.nome}})
            if (findOne){
                return res.status(400).json({msg: "Local já cadastrado!"})
            }

            const newAdm = await prisma.local.create({data})
            res.status(201).json({newAdm, msg: "Local cadastrado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: "Error: " + error})
        }
    },


    ///Seleciona todos os locais
    getAll: async(req, res) => {
        try {
            const allLocais = await prisma.local.findMany()
            return res.status(200).json(allLocais)
        } catch (error) {
            console.log(error)
        }
    },

    //Pega 1 adm
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const local = await prisma.local.findUnique({where: {idLocal: id}})
            
            return res.status(200).json(local)
            
        } catch (error) {
           console.log(error) 
        }
    },

    update: async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                adm: req.body.adm
            }
            
            const findOne = await prisma.local.findUnique({where: {nome: data.nome}})
            if (findOne){
                return res.status(400).json({msg: "Dados já cadastrados!"})
            }

            const attLocal = await prisma.local.update({where: {nome: data.nome}, data})
            res.status(201).json({attLocal, msg: "Local atualizado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: "Error: " + error})
        }
    },
    
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const local = await prisma.local.findUnique({where: {idLocal: id}})
            if (!local) {return res.status(404).json({msg: "Local não encontrado!"})}
            const deletedAdm = await prisma.administrador.delete({where: {idAdm: id}})
            if (deletedAdm) {return res.status(200).json({msg: "Local deletado!"})}
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerLocal