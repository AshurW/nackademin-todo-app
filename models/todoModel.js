const dataStore = require('nedb');

const todoCollection = new dataStore({
        filename: __dirname + '/../database/todo.db', 
        autoload: true, 
        timestampData: true
});

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

function removeTodo(id) {
    return new Promise((resolve, reject) => {
        todoCollection.remove({ _id: id }, {}, (err, todoRemoved) => {
            if (err) {
                console.log(err)
            }
            resolve(todoRemoved)
        })
    })
}

function updateTodoDone(id, done) {
    return new Promise((resolve, reject) => {
        todoCollection.update({ _id: id }, {$set: { done }}, {}, (err, todoUpdated) => {
            if (err) {
                console.log(err)
            }
            resolve(todoUpdated)
        })
    })
}

function updateTodoTitle(id, title) {
    return new Promise((resolve, reject) => {
        todoCollection.update({ _id: id }, {$set: { title }}, {}, (err, todoUpdated) => {
            if (err) {
                console.log(err)
            }
            resolve(todoUpdated)
        })
    })
}


module.exports = {findAllTodos, insertTodo, removeTodo, updateTodoDone, updateTodoTitle}