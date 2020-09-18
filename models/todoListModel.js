require('dotenv').config()
const mongoose = require('mongoose')

const todoModel = require('./todoModel')

const todoListSchema = new mongoose.Schema({
    todoListName: String,
    todoArray: Array,
    createdBy: String
})

const TodoList = mongoose.model('TodoList', todoListSchema)

async function createList(todoList) {
    try {
        const result = await TodoList.create(todoList)
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function insertTodoInList(item) {
    try {
        const result = await TodoList.findByIdAndUpdate(item.todoListId, {$push: {todoArray: item.todoId}}, {new: true})
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getAllTodoLists() {
    try {
        return await TodoList.find({})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getTodoList(todoListId) {
    try {
        return await TodoList.findById(todoListId)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getTodoListAndAllTodos(todoListId) {
    try {
        let tmp = []
        let todoList = await TodoList.findById(todoListId)
        for (const todo of todoList.todoArray) {
            const res = await todoModel.findOneTodo(todo._id)
            tmp.push(res)
        }
        todoList.todoArray = tmp
        return todoList
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getAllTodoListCreatedBy(userId) {
    try {
        return await TodoList.find({createdBy: userId})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeTodoListAndAllTodo(todoListId) {
    try {
        const todoList = await TodoList.findById(todoListId)
        for (const todo of todoList.todoArray) {
            const res = await todoModel.removeTodo(todo)
        }
        const result = await TodoList.findByIdAndDelete(todoListId)
        return { message: 'Removed all todos and the list', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeAllCreatedBy(userId) {
    try {
        const result = await TodoList.deleteMany({createdBy: userId})
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}


module.exports = { TodoList, createList, insertTodoInList, getAllTodoLists, getTodoList, getTodoListAndAllTodos, getAllTodoListCreatedBy, removeTodoListAndAllTodo, removeAllCreatedBy }