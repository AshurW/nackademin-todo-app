const express = require('express')
const todoModel = require('../models/todoModel')

async function getAllTodos(req, res) {
    res.send(await todoModel.findAllTodos())
}

async function addTodo(req, res) {
    const todo = { title: req.body.todoTitle, done: req.body.todoDone }
    res.send(await todoModel.insertTodo(todo))
}

async function deleteTodo(req, res) {
    const todoId = req.params.id
    res.json(await todoModel.removeTodo(todoId))
}

async function checkTodo(req, res) {
    const todoId = req.params.id
    const todoDone = req.body.todoDone
    res.json(await todoModel.updateTodoDone(todoId, todoDone))
}

module.exports = { getAllTodos, addTodo, deleteTodo, checkTodo }