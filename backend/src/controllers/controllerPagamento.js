const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerPagamento = {

    //Criar um novo horário
    create: async (req, res) => {
        try {
            const data = {
                tipo: req.body.tipo,
                alunoId: req.body.alunoId,
                valor: req.body.valor,
                status: "Pago"
            }

            const newPagamento = await prisma.pagamento.create({data})
            res.status(201).json({newPagamento, msg: "Pagamento agendado!"})
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: error})
        }
    },


    ///Seleciona todos os pagamentos
    getAll: async(req, res) => {
        try {
            const allPagamentos = await prisma.pagamento.findMany()
            return res.status(200).json(allPagamentos)
        } catch (error) {
            console.log(error)
        }
    },

    //Seleciona apenas um Func
    getpaymentsStudent: async(req, res) => {
        try {
            
            var id = req.params.id
            id = parseInt(id)
            
            const payments = await prisma.pagamento.findMany({where: {alunoId: id, status: "Pendente"}, select: {aluno: true}})
            if (payments.length < 1) {
                return res.status(404).json({msg: "Não há pagamentos pendentes para esse aluno"})
            }
            return res.status(200).json(payments)
            
        } catch (error) {
           console.log(error) 
        }
    },

    attDatePayment: async() => {
        try {
            await prisma.$executeRaw`
                UPDATE "Pagamento"
                SET "status" = 'Pendente'
                WHERE "status" = 'Aprovado' 
                AND "updatedAt" < NOW() - INTERVAL '30 days';
            `;
            console.log('Status de pagamento Pendente atualizado com sucesso');
        } catch (err) {
            console.error('Erro ao atualizar status de pagamento:', err);
        }
    },

    //Atualiza o horário
    update: async(req, res) => {
        this.attDatePayment
        try {
            var id = req.params.id
            
            const data = {
                tipo: req.body.tipo,
                valor: req.body.valor,
                status: req.body.status
            }
            id = parseInt(id)
            const updatePagamento = await prisma.pagamento.update({where: {idPagamento: id}, data})
            return res.status(200).json({updatePagamento, msg: "Pagamento atualizado!"})
        } catch (err) {
            console.log(err)
        }
    },
    
    //Altera a pendência do pagamento
    alterPendentPayment: async(req, res) => {
        try {
            var id = req.params.id
            id = parseInt(id)
            const pagamento = await prisma.pagamento.findUnique({where: {idPagamento: id, status: "Pendente"}})
            if (!pagamento) {return res.status(404).json({msg: "Pagamento não encontrado!"})}
            const alterarPagamento = await prisma.pagamento.update({where: {idPagamento: id}, data: {status: "Pago"}})
            return res.status(200).json({alterarPagamento, msg: "Pagamento realizado!"})
        } catch (err) {
            console.log(err)
        }
    },
    
    delete: async(req, res) => {
        try {
            const id = parseInt(req.params.id)
            const findPayment = await prisma.pagamento.findUnique({where: {idPagamento: id}})
            if (!findPayment) {
                return res.status(404).json({msg: "Pagamento não encontrado!"})
            }
            await prisma.pagamento.delete({where: {idPagamento: id}})
            return res.json({msg: "Pagamento deletado!"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = controllerPagamento