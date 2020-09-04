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

async function insertTodoInList(item) {
    return new Promise((resolve, reject) => {
        todoListCollection.update({ _id: item.todoListId }, { $push: { todoArray: item.todoId } }, { returnUpdatedDocs: true }, (err, todoUpdated, affectedDocuments) => {
            if (err) {
                console.log(err)
            }
            resolve({message: 'todo is added to todoList array', affectedDocuments})
        })
    })
}


module.exports = { todoListCollection, createList, insertTodoInList }