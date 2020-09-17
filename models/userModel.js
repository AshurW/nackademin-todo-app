require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'this is a secret'

const todoListModel = require('../models/todoListModel')
const todoModel = require('../models/todoModel')

// const dataStore = require('nedb')
// var userCollection

// if (process.env.ENV === 'TEST') {
//     var userCollection = new dataStore({
//         filename: __dirname + '/../database/test/user.db',
//         autoload: true,
//         timestampData: true
//     });
// } else {
//     var userCollection = new dataStore({
//         filename: __dirname + '/../database/user.db',
//         autoload: true,
//         timestampData: true
//     });
// }

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
})

const User = mongoose.model('User', userSchema)

async function insertUser(user) {
    // return new Promise((resolve, reject) => {
    //     bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
    //         const newUser = { username: user.username, password: hashedPassword, role: user.role }
    //         userCollection.insert(newUser, (err, newDoc) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             resolve(newDoc)
    //         })
    //     })
    // })
    try {
        const newUser = {
            username: user.username,
            password: bcrypt.hashSync(user.password, 10),
            role: user.role
        }
        const result = await User.create(newUser)
        return {
            _id: result._id.toString(),
            username: result.username,
            role: result.role
        }
    } catch (error) {
        console.log(error)
    }
}

function loginUser(user) {
    // return new Promise((resolve, reject) => {
    //     userCollection.findOne({ username: user.username }, (err, doc) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //         if (doc) {
    //             bcrypt.compare(user.password, doc.password, (err, result) => {
    //                 if (!result) {
    //                     resolve('wrong user information')
    //                 } else {
    //                     const token = jwt.sign(doc, jwtSecret, { expiresIn: '1h' })
    //                     resolve({
    //                         message: 'login success',
    //                         token
    //                     })
    //                 }
    //             })
    //         } else {
    //             reject('user doesnt exist')
    //         }
    //     })
    // })
}

// async function getAllUserInfo(userInfo) {
//     const allTodoList = await todoListModel.getAllTodoListCreatedBy(userInfo.id)
//     const allTodos = await todoModel.findAllCreatedBy(userInfo.id)

//     const allInfo = {
//         user: userInfo.username,
//         allTodoList,
//         allTodos
//     }
//     return allInfo
// }

// async function removeUser(userId) {
//     await userCollection.remove({_id: userId})
// }

module.exports = { userCollection, insertUser, loginUser, getAllUserInfo, removeUser }