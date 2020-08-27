const express = require('express')
const app = express()

const todoRouter = require('./router/todoRouter')
const userRouter = require('./router/userRouter')

app.use(express.urlencoded({ exteded: true }))
app.use(express.json())
app.use(express.static('./public'))

app.use('/', todoRouter)
app.use('/user', userRouter)

app.listen(8080, () => console.log('Connected to Server'))