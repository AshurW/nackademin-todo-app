require('dotenv').config()
const mongoose = require('mongoose')
// const dataStore = require('nedb');

// var todoCollection

// if (process.env.ENV === 'TEST') {
//     var todoCollection = new dataStore({
//         filename: __dirname + '/../database/test/todo.db',
//         autoload: true,
//         timestampData: true
//     });
// } else {
//     var todoCollection = new dataStore({
//         filename: __dirname + '/../database/todo.db',
//         autoload: true,
//         timestampData: true
//     });
// }

const TodoSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    createdBy: String,
    todoListId: String
})

const Todo = mongoose.model('Todo', TodoSchema)

async function findAllTodos() {
    try {
        return await Todo.find({})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function findOneTodo(id) {
    try {
        return await Todo.findById(id)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function findAllCreatedBy(userId) {
    try {
        return await Todo.find({ createdBy: userId })
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function insertTodo(todo) {
    try {
        return await Todo.create(todo)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeTodo(id) {
    try {
        await Todo.findByIdAndDelete(id)
        return { message: 'Removed the todo' }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function updateTodoDone(id, done) {
    try {
        const result = await Todo.updateOne({ _id: id }, { done })
        return { message: 'updated done for todo', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function updateTodoTitle(id, title, user) {
    try {
        const result = await Todo.updateOne({ _id: id }, { title })
        return { message: 'todo title updated', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeAllCreatedBy(userId) {
    try {
        const result = await Todo.deletfindByIdAndDeleteeMany(userId)
        return { message: 'remove all todos createdBy', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}


module.exports = { Todo , findAllTodos, findOneTodo, findAllCreatedBy, insertTodo, removeTodo, updateTodoDone, updateTodoTitle, removeAllCreatedBy }