require('dotenv').config()
const dataStore = require('nedb')

const todoModel = require('./todoModel')

var todoListCollection

if (process.env.ENV === 'TEST') {
    var todoListCollection = new dataStore({
        filename: __dirname + '/../database/test/todoListT.db',
        autoload: true,
        timestampData: true
    });
} else if (process.env.ENV === 'DEV') {
    var todoListCollection = new dataStore({
        filename: __dirname + '/../database/todoList.db',
        autoload: true,
        timestampData: true
    });
}


function createList(todoList) {
    return new Promise((resolve, reject) => {
        todoListCollection.insert(todoList, (err, newDoc) => {
            if (err) {
                console.log(err)
            }
            resolve(newDoc)
        })
    })
}

function insertTodoInList(item) {
    return new Promise((resolve, reject) => {
        todoListCollection.update({ _id: item.todoListId }, { $push: { todoArray: item.todoId } }, { returnUpdatedDocs: true }, (err, todoUpdated, affectedDocuments) => {
            if (err) {
                console.log(err)
            }
            resolve({ message: 'todo is added to todoList array', affectedDocuments })
        })
    })
}

function getAllTodoLists() {
    return new Promise((resolve, reject) => {
        todoListCollection.find({}, (err, docs) => {
            if (err) {
                console.log(err)
            }
            resolve(docs)
        })
    })
}

function getTodoList(todoListId) {
    return new Promise((resolve, reject) => {
        todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
            if (err) {
                console.log(err)
            }
            resolve(doc)
        })
    })
}

function getTodoListAndAllTodos(todoListId) {
    return new Promise((resolve, reject) => {
        todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
            if (err) {
                console.log(err)
            }
            let todos = []
            for (const todoId of doc.todoArray) {
                todos.push(todoModel.findOneTodo(todoId))
            }
            Promise.all(todos).then(res => {
                doc.todoArray = res
                resolve(doc)
            })
        })
    })
}

function getAllTodoListCreatedBy(userId) {
    return new Promise((resolve, reject) => {
        todoListCollection.find({ createdBy: userId }, (err, docs) => {
            if (err) {
                console.log(err)
            }
            resolve(docs)
        })
    })
}

function removeTodoListAndAllTodo(todoListId) {
    return new Promise((resolve, reject) => {
        todoListCollection.findOne({ _id: todoListId }, (err, doc) => {
            if (err) {
                console.log(err)
            }
            let todos = []
            for (const todoId of doc.todoArray) {
                todos.push(todoModel.removeTodo(todoId))
            }
            Promise.all(todos)
        })
        todoListCollection.remove({ _id: todoListId }, (err, numRemoved) => {
            if (err) {
                err
            }
            resolve({ message: 'Removed all todos and the list', numRemoved })
        })
    })
}

function removeAllCreatedBy(userId) {
    return new Promise((resolve, reject) => {
        todoListCollection.remove({createdBy: userId}, {multi: true}, (err, numRemoved) => {
            if (err) {
                console.log(err)
            }
            resolve(numRemoved)
        })
    })
}


module.exports = { todoListCollection, createList, insertTodoInList, getAllTodoLists, getTodoList, getTodoListAndAllTodos, getAllTodoListCreatedBy, removeTodoListAndAllTodo, removeAllCreatedBy }