const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerLocal = {

    //Criar um novo ADM
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.body.nome,
                cpf: req.body.body.cpf,
                email: req.body.body.email,
                senha: req.body.body.senha,
                salario: parseFloat(req.body.body.salario)
            }
            const newAdm = await prisma.administrador.create({data})
            res.status(201).json({newAdm, msg: "Administrador cadastrado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: "Error: " + error})
        }
    },


    ///Seleciona todos os ADM's
    getAll: async(req, res) => {
        try {
            const allAdms = await prisma.administrador.findMany()
            return res.status(200).json(allAdms)
        } catch (error) {
            console.log(error)
        }
    },


    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const adm = await prisma.administrador.findUnique({where: {idAdm: id}})
            
            return res.status(200).json(adm)
            
        } catch (error) {
           console.log(error) 
        }
    },
    
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const adm = await prisma.administrador.findUnique({where: {idAdm: id}})
            if (!adm) {return res.status(404).json({msg: "Usuário não encontrado!"})}
            const deletedAdm = await prisma.administrador.delete({where: {idAdm: id}})
            return res.status(200).json({msg: "usuário deletado"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerAdministrador