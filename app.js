const express = require('express')
const app = express()

const todoRouter = require('./router/todoRouter')

app.use(express.urlencoded({ exteded: true }))
app.use(express.json())
app.use(express.static('./public'))

app.use('/', todoRouter)

app.listen(8080, () => console.log('Connected to Server'))