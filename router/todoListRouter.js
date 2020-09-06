const express = require('express')
const todoListRouter = express.Router()

const todoListController = require('../controllers/todoListController')
const authMiddle = require('../middleware/authMiddle')

// todoListRouter.get('/todoListAndTodos', todoListController.getAllTodoListAndTodos)
todoListRouter.post('/createTodoList', authMiddle.isAuthenticated, todoListController.createTodoList)

module.exports = todoListRouter