const todoListModel = require('../models/todoListModel')

async function getAllTodoLists(req, res) {
    res.status(200).json(await todoListModel.getAllTodoLists())
}

async function getTodoList(req, res) {
    const todoListId = req.body.todoListId
    res.status(200).json(await todoListModel.getTodoList(todoListId))
}

async function getTodoListAndAllTodos(req, res) {
    const todoListId = req.body.todoListId
    res.status(200).json(await todoListModel.getTodoListAndAllTodos(todoListId))
}

async function createTodoList(req, res) {
    console.log(req.user)
    const todoList = { todoListName: req.body.todoListName, todoArray: [], createdBy: req.user._id }
    res.status(201).json(await todoListModel.createList(todoList))
}

module.exports = { getAllTodoLists, getTodoList, getTodoListAndAllTodos, createTodoList }