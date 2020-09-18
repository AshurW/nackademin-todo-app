require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'this is a secret'

const todoListModel = require('../models/todoListModel')
const todoModel = require('../models/todoModel')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
})

const User = mongoose.model('User', userSchema)

async function insertUser(user) {
    try {
        const newUser = {
            username: user.username,
            password: bcrypt.hashSync(user.password, 10),
            role: user.role || 'user'
        }
        const result = await User.create(newUser)
        return {
            _id: result._id.toString(),
            username: result.username,
            role: result.role
        }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function loginUser(user) {
    try {
        const userData = await User.findOne({ username: user.username })
        const validPassword = bcrypt.compareSync(user.password, userData.password)
        if (!validPassword) { throw new Error('Wrong password') }
        const dataToToken = { _id: userData._id, username: userData.username, role: userData.role }
        const token = jwt.sign(dataToToken, jwtSecret, { expiresIn: '1h' })
        return {
            message: 'login success',
            token
        }
    } catch (error) {
        return { message: 'something is wrong' }
    }
}

async function getAllUserInfo(userInfo) {
    const allTodoList = await todoListModel.getAllTodoListCreatedBy(userInfo.id)
    const allTodos = await todoModel.findAllCreatedBy(userInfo.id)

    const allInfo = {
        user: userInfo.username,
        allTodoList,
        allTodos
    }
    return allInfo
}

async function removeUser(userId) {
    try {
        const result = await User.findByIdAndDelete(userId)
        return { message: 'User is removed', result }
    } catch (error) {
         return { message: 'something is wrong' }
    }
}

module.exports = { User, insertUser, loginUser, getAllUserInfo, removeUser }