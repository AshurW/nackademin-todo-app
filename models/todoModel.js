require('dotenv').config()
const dataStore = require('nedb');

var todoCollection

if (process.env.ENV === 'TEST') {
    var todoCollection = new dataStore({
        filename: '../database/test/todo.db',
        autoload: true,
        timestampData: true
    });
} else {
    var todoCollection = new dataStore({
        filename: __dirname + '../database/todo.db',
        autoload: true,
        timestampData: true
    });
}

function findAllTodos() {
    return new Promise((resolve, reject) => {
        todoCollection.find({}, (err, docs) => {
            if (err) {
                console.log(err)
            }
            resolve(docs)
        })
    })
}

function findOneTodo(id) {
    return new Promise((resolve, reject) => {
        todoCollection.findOne({ _id: id }, (err, doc) => {
            if (err) {
                console.log(err)
            }
            resolve(doc)
        })
    })
}

function insertTodo(todo) {
    return new Promise((resolve, reject) => {
        todoCollection.insert(todo, (err, newDoc) => {
            if (err) {
                console.log(err)
            }
            resolve(newDoc)
        })
    })
}

function removeTodo(id, user) {
    return new Promise((resolve, reject) => {
        todoCollection.remove({ _id: id }, {}, (err, todoRemoved) => {
            if (err) {
                console.log(err)
            }
            resolve({ message: 'You have removed the todo' })
        })
    })
}

function updateTodoDone(id, done, user) {
    return new Promise((resolve, reject) => {
        todoCollection.update({ _id: id }, { $set: { done } }, {}, (err, todoUpdated) => {
            if (err) {
                console.log(err)
            }
            resolve({ message: 'Todo check has been updated' })
        })
    })
}

function updateTodoTitle(id, title, user) {
    return new Promise((resolve, reject) => {
        todoCollection.update({ _id: id }, { $set: { title } }, {}, (err, todoUpdated) => {
            if (err) {
                console.log(err)
            }
            resolve({ message: 'Todo title has been updated' })
        })
    })
}


module.exports = { todoCollection, findAllTodos, findOneTodo, insertTodo, removeTodo, updateTodoDone, updateTodoTitle }