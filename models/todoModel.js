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
    // return new Promise((resolve, reject) => {
    //     todoCollection.find({}, (err, docs) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(docs)
    //     })
    // })
    try {
        return await Todo.find({})
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function findOneTodo(id) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.findOne({ _id: id }, (err, doc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(doc)
    //     })
    // })
    try {
        return await Todo.findById(id)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function findAllCreatedBy(userId) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.find({createdBy: userId}, (err, docs) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(docs)
    //     })
    // })
    try {
        return await Todo.find({ createdBy: userId })
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function insertTodo(todo) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.insert(todo, (err, newDoc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(newDoc)
    //     })
    // })
    try {
        return await Todo.create(todo)
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeTodo(id) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.remove({ _id: id }, {}, (err, todoRemoved) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve({ message: 'You have removed the todo' })
    //     })
    // })
    try {
        await Todo.findByIdAndDelete(id)
        return { message: 'Removed the todo' }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function updateTodoDone(id, done) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.update({ _id: id }, { $set: { done } }, {}, (err, todoUpdated) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve({ message: 'Todo check has been updated' })
    //     })
    // })
    try {
        const result = await Todo.updateOne({ _id: id }, { done })
        return { message: 'updated done for todo', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function updateTodoTitle(id, title, user) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.update({ _id: id }, { $set: { title } }, {}, (err, todoUpdated) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve({ message: 'Todo title has been updated' })
    //     })
    // })
    try {
        const result = await Todo.updateOne({ _id: id }, { title })
        return { message: 'todo title updated', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function removeAllCreatedBy(userId) {
    // return new Promise((resolve, reject) => {
    //     todoCollection.remove({ createdBy: userId }, { multi: true }, (err, numRemoved) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         resolve(numRemoved)
    //     })
    // })
    try {
        const result = await Todo.deletfindByIdAndDeleteeMany(userId)
        return { message: 'remove all todos createdBy', result }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}


module.exports = { Todo , findAllTodos, findOneTodo, findAllCreatedBy, insertTodo, removeTodo, updateTodoDone, updateTodoTitle, removeAllCreatedBy }