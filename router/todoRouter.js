const express = require('express')
const todoRouter = express.Router()

const todoController = require('../controllers/todoController')

todoRouter.get('/allTodos', todoController.getAllTodos)
todoRouter.post('/addTodo', todoController.addTodo)
todoRouter.delete('/deleteTodo/:id', todoController.deleteTodo)
todoRouter.patch('/checkTodo/:id', todoController.checkTodo)
todoRouter.patch('/editTitle/:id', todoController.editTitle)




module.exports = todoRouter