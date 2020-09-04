require('dotenv').config()
const dataStore = require('nedb')
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
        const todoListArrayUpdated = todoListCollection.update({ _id: item.todoListId }, { $push: { todoArray: item.todoId } }, { returnUpdatedDocs: true }, (err, todoUpdated) => {
            if (err) {
                console.log(err)
            }
        })
        resolve({ message: 'Todo has been added', todoListArrayUpdated })
    })
}


module.exports = { todoListCollection, createList, insertTodoInList }