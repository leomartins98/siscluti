const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const controllerPessoa = {
    getAll: async(req, res) => {
        try {
            const allPessoas = await prisma.pessoa.findMany({
                orderBy: {
                  id: 'asc'
                }})
            return res.status(200).json(allPessoas)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = controllerPessoa