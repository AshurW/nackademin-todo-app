require('dotenv').config()
const mongoose = require('mongoose')

const todoModel = require('./todoModel')

// const dataStore = require('nedb')
// var todoListCollection

// if (process.env.ENV === 'TEST') {
//     var todoListCollection = new dataStore({
//         filename: __dirname + '/../database/test/todoList.db',
//         autoload: true,
//         timestampData: true
//     });
// } else {
//     var todoListCollection = new dataStore({
//         filename: __dirname + '/../database/todoList.db',
//         autoload: true,
//         timestampData: true
//     });
// }

const todoListSchema = new mongoose.Schema({
    todoListName: String,
    todoArray: Array,
    createdBy: String
})

const TodoList = mongoose.model('TodoList', todoListSchema)

async function createList(todoList) {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.insert(todoList, (err, newDoc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(newDoc)
    //     })
    // })
    try {
        console.log(todoList)
        const result = await TodoList.create(todoList)
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function insertTodoInList(item) {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.update({ _id: item.todoListId }, { $push: { todoArray: item.todoId } }, { returnUpdatedDocs: true }, (err, todoUpdated, affectedDocuments) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve({ message: 'todo is added to todoList array', affectedDocuments })
    //     })
    // })
    try {
        const result = await TodoList.findByIdAndUpdate(item.todoListId, {$push: {todoArray: item.todoId}}, {new: true})
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getAllTodoLists() {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.find({}, (err, docs) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(docs)
    //     })
    // })
    try {
        return await TodoList.find({})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getTodoList(todoListId) {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(doc)
    //     })
    // })
    try {
        return await TodoList.findById(todoListId)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getTodoListAndAllTodos(todoListId) {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         let todos = []
    //         for (const todoId of doc.todoArray) {
    //             todos.push(todoModel.findOneTodo(todoId))
    //         }
    //         Promise.all(todos).then(res => {
    //             doc.todoArray = res
    //             resolve(doc)
    //         })
    //     })
    // })
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
    // return new Promise((resolve, reject) => {
    //     todoListCollection.find({ createdBy: userId }, (err, docs) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(docs)
    //     })
    // })
    try {
        return await TodoList.find({createdBy: userId})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeTodoListAndAllTodo(todoListId) {
    // return new Promise((resolve, reject) => {
    //     todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         let todos = []
    //         for (const todoId of doc.todoArray) {
    //             todos.push(todoModel.removeTodo(todoId))
    //         }
    //         Promise.all(todos)
    //     })
    //     todoListCollection.remove({ _id: todoListId }, (err, numRemoved) => {
    //         if (err) {
    //             err
    //         }
    //         resolve({ message: 'Removed all todos and the list', numRemoved })
    //     })
    // })
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
    // return new Promise((resolve, reject) => {
    //     todoListCollection.remove({ createdBy: userId }, { multi: true }, (err, numRemoved) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(numRemoved)
    //     })
    // })
    try {
        const result = await TodoList.deleteMany({createdBy: userId})
        return result
    } catch (error) {
        return { message: 'something is wrong' }
    }
}


module.exports = { TodoList, createList, insertTodoInList, getAllTodoLists, getTodoList, getTodoListAndAllTodos, getAllTodoListCreatedBy, removeTodoListAndAllTodo, removeAllCreatedBy }