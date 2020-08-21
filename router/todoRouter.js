const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todoController')

router.get('/', todoController.getAllTodos)
router.post('/addTodo', todoController.addTodo)
router.delete('/deleteTodo/:id', todoController.deleteTodo)
router.patch('/checkTodo/:id', todoController.checkTodo)

module.exports = router