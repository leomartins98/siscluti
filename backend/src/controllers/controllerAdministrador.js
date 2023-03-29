const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerAdministrador = {

    //Criar um novo ADM
    create: async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                senha: req.body.senha,
                salario: parseFloat(req.body.salario)
            }
            const data2 = {
                email: req.body.email,
                senha: req.body.senha,
                cargo: 1
            }
            
            const findOne = await prisma.administrador.findUnique({where: {email: data.email}})
            if (findOne){return res.status(400).json({msg: "E-mail já cadastrado!"})}
            
            const findCpf = await prisma.administrador.findUnique({where: {cpf: data.cpf}})
            if (findCpf) {return res.status(400).json({msg: "Cpf já cadastrado!"})}

            const newAdm = await prisma.administrador.create({data})
            await prisma.pessoa.create({data: data2})
            res.status(201).json({newAdm, msg: "Administrador cadastrado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: "Error: " + error})
        }
    },


    ///Seleciona todos os ADM's
    getAll: async(req, res) => {
        try {
            const allAdms = await prisma.administrador.findMany({
                orderBy: {
                  idAdm: 'asc'
                }})
            return res.status(200).json(allAdms)
        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {

            const id = parseInt(req.params.id)

            const data = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                salario: parseFloat(req.body.salario),
                senha: req.body.senha,
                email: req.body.email
            }

            const findAdm = await prisma.administrador.findUnique({where: {idAdm: id}})

            if (!findAdm) {return res.status(400).json({msg: "Administrador não encontrado"})}

            const attAdm = await prisma.administrador.update({where: {idAdm: id}, data})

            res.status(201).json({attAdm, msg: "Professor atualizado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    },

    //Seleciona apenas um ADM
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const adm = await prisma.administrador.findUnique({where: {idAdm: id}})
            if (!adm) {
                return res.status(404).json({msg: "Administrador não encontrado!"})
            }
            return res.status(200).json(adm)
            
        } catch (error) {
           console.log(error) 
        }
    },
    
    //Deleta o ADM
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const adm = await prisma.administrador.findUnique({where: {idAdm: id}})
            if (!adm) {return res.status(404).json({msg: "Administrador não encontrado!"})}
            const deletedAdm = await prisma.administrador.delete({where: {idAdm: id}})
            return res.status(200).json({msg: "usuário deletado"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerAdministrador