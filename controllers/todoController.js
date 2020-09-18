const todoModel = require('../models/todoModel')
const todoListModel = require('../models/todoListModel')

async function getAllTodos(req, res) {
    res.send(await todoModel.findAllTodos())
}

async function addTodo(req, res) {
    const todo = { title: req.body.todoTitle, done: req.body.todoDone, createdBy: req.user._id, todoListId: req.body.todoListId}
    const createdTodo = await todoModel.insertTodo(todo)
    await todoListModel.insertTodoInList({todoListId: req.body.todoListId, todoId: createdTodo._id})
    res.send(createdTodo)
}

async function deleteTodo(req, res) {
    const todoId = req.params.id
    if (req.user.role !== 'admin') {
        const docs = await todoModel.findOneTodo(todoId)
        if (docs.createdBy !== req.user._id) return res.json({ message: 'You cant do that' })
        return res.json(await todoModel.removeTodo(todoId))
    }
    return res.json(await todoModel.removeTodo(todoId))
}

async function checkTodo(req, res) {
    const todoId = req.params.id
    const todoDone = req.body.todoDone
    if (req.user.role !== 'admin') {
        const docs = await todoModel.findOneTodo(todoId)
        if (docs.createdBy !== req.user._id) return res.json({ message: 'You cant do that' })
        return res.json(await todoModel.updateTodoDone(todoId, todoDone))
    }
    return res.json(await todoModel.updateTodoDone(todoId, todoDone))
}

async function editTitle(req, res) {
    const todoId = req.params.id
    const todoTitle = req.body.todoTitle
    if (req.user.role !== 'admin') {
        const docs = await todoModel.findOneTodo(todoId)
        if (docs.createdBy !== req.user._id) return res.json({ message: 'You cant do that' })
        return res.json(await todoModel.updateTodoTitle(todoId, todoTitle))
    }
    res.json(await todoModel.updateTodoTitle(todoId, todoTitle))
}

module.exports = { getAllTodos, addTodo, deleteTodo, checkTodo, editTitle }