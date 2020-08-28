const todoModel = require('../models/todoModel')

async function getAllTodos(req, res) {
    res.send(await todoModel.findAllTodos())
}

async function addTodo(req, res) {
    const todo = { title: req.body.todoTitle, done: req.body.todoDone, createdBy: req.user._id }
    res.send(await todoModel.insertTodo(todo))
}

async function deleteTodo(req, res) {
    const todoId = req.params.id
    const user = {id: req.user._id, role: req.user.role}
    res.json(await todoModel.removeTodo(todoId, user))
}

async function checkTodo(req, res) {
    const todoId = req.params.id
    const todoDone = req.body.todoDone
    const user = {id: req.user._id, role: req.user.role}
    res.json(await todoModel.updateTodoDone(todoId, todoDone, user))
}

async function editTitle(req, res) {
    const todoId = req.params.id
    const todoTitle = req.body.todoTitle
    const user = {id: req.user._id, role: req.user.role}
    res.json(await todoModel.updateTodoTitle(todoId, todoTitle, user))
}

module.exports = { getAllTodos, addTodo, deleteTodo, checkTodo, editTitle }