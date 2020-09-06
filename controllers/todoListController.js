const todoListModel = require('../models/todoListModel')

async function createTodoList(req, res) {
    const todoList = { todoListName: req.body.todoListName, todoArray: [], createdBy: req.user._id }
    res.json(await todoListModel.createList(todoList))
}

module.exports = { createTodoList }