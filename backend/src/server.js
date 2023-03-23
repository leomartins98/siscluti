const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const routes = require('../routes/router')
app.use('/api', routes)

app.listen(3333, () => {
    console.log('Porta rodando na porta 3333')
})