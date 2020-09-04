require('dotenv').config()
const dataStore = require('nedb')

const todoModel = require('./todoModel')

var todoListCollection

if (process.env.ENV === 'TEST') {
    var todoListCollection = new dataStore({
        filename: '../database/test/todoList.db',
        autoload: true,
        timestampData: true
    });
} else {
    var todoListCollection = new dataStore({
        filename: __dirname + '../database/todoList.db',
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
            resolve({message: 'todo is added to todoList array', affectedDocuments})
        })
    })
}

function getTodoListAndAllTodo(todoListId) {
    return new Promise((resolve, reject) => {
        todoListCollection.findOne({_id: todoListId}, async (err, doc) => {
            if (err) {
                console.log(err)
            }
            let todos = []
            for (const todoId of doc.todoArray) {
                const temp = await todoModel.findOneTodo(todoId)
                todos.push(temp)
            }
            doc.todoArray = todos
            resolve(doc)
        })
    })
}


module.exports = { todoListCollection, createList, insertTodoInList, getTodoListAndAllTodo }