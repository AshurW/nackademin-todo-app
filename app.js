const express = require('express')
const app = express()

const todoListRouter = require('./router/todoListRouter')
const todoRouter = require('./router/todoRouter')
const userRouter = require('./router/userRouter')

// app.use(express.urlencoded({ exteded: true })) alex sa det här
app.use(express.json())
app.use(express.static('./public'))

app.use('/', todoListRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)

module.exports = app
