const express = require('express')
const todoRouter = express.Router()

const todoController = require('../controllers/todoController')
const authMiddle = require('../middleware/authMiddle')

todoRouter.get('/allTodos', todoController.getAllTodos)
todoRouter.post('/addTodo', authMiddle.isAuthenticated, todoController.addTodo)
todoRouter.delete('/deleteTodo/:id', authMiddle.isAuthenticated, todoController.deleteTodo)
todoRouter.patch('/checkTodo/:id', authMiddle.isAuthenticated, todoController.checkTodo)
todoRouter.patch('/editTitle/:id', authMiddle.isAuthenticated, todoController.editTitle)

module.exports = todoRouter