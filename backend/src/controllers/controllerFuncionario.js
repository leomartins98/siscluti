const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerFuncionario = {

    //Criar um novo Funcionário
    create: async (req, res) => {
        
        try {
            const data = {
                localId: parseInt(req.body.localId),      
                nome: req.body.nome,
                admId: req.body.admId,      
                cpf: req.body.cpf,      
                email: req.body.email,
                senha: req.body.senha,    
                salario: parseFloat(req.body.salario)
            }
            const data2 = {
                email: req.body.email,
                senha: req.body.senha,
                cargo: 0
            }

            const findEmail = await prisma.funcionario.findUnique({where: {email: data.email}})

            if (findEmail){return res.status(400).json({msg: "E-mail já cadastrado!"})}

            const findCpf = await prisma.funcionario.findUnique({where: {cpf: data.cpf}})

            if (findCpf) {return res.status(400).json({msg: "CPF já cadastrado!"})}

            const newFunc = await prisma.funcionario.create({data})

            await prisma.pessoa.create({data: data2})
            
            res.status(201).json({newFunc, msg: "Funcionário cadastrado!"})

        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },


    ///Seleciona todos os Func's
    getAll: async(req, res) => {
        try {
            const allFuncs = await prisma.funcionario.findMany({include: {local: true, administrador: true}})
            return res.status(200).json(allFuncs)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas um Func
    getOne: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const adm = await prisma.funcionario.findUnique({where: {idFunc: id}})
            if (!adm) {
                return res.status(404).json({msg: "Funcionário não encontrado!"})
            }
            return res.status(200).json(adm)
            
        } catch (error) {
           console.log(error) 
        }
    },

    //Atualiza o funcionário
    update: async(req, res) => {
        try {
            var id = req.params.id
            
            const data = {      
                nome: req.body.nome,      
                cpf: req.body.cpf,      
                email: req.body.email,
                senha: req.body.senha,    
                salario: req.body.salario
            }
            
            if (data.email){
            const findEmail = await prisma.funcionario.findUnique({where: {email: data.email}})
            if (findEmail){return res.status(400).json({msg: "E-mail já cadastrado!"})}
            }
            
            if (data.cpf){
            const findCpf = await prisma.funcionario.findUnique({where: {cpf: data.cpf}})
            if (findCpf) {return res.status(400).json({msg: "CPF já cadastrado!"})}
            }
            
            id = parseInt(id)
            const updateFunc = await prisma.funcionario.update({where: {idFunc: id}, data})
            return res.status(200).json({updateFunc, msg: "Funcionário atualizado!"})
        } catch (err) {
            console.log(err)
        }
    },
    
    //Deleta o Func
    delete: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const func = await prisma.funcionario.findUnique({where: {idFunc: id}})
            if (!func) {return res.status(404).json({msg: "Funcionário não encontrado!"})}
            const deletedAdm = await prisma.funcionario.delete({where: {idFunc: id}})
            return res.status(200).json({msg: "Funcionário deletado!"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerFuncionario