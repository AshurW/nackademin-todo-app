const todoListModel = require('../models/todoListModel')
const todoModel = require('../models/todoModel')
const userModel = require('../models/userModel')

async function createUser(req, res) {
    const newUser = { username: req.body.username, password: req.body.password, role: req.body.role }
    res.send(await userModel.insertUser(newUser))
}

async function loginUser(req, res) {
    try {
        const user = { username: req.body.username, password: req.body.password }
        res.json(await userModel.loginUser(user))
    } catch (error) {
        console.log(error)
        res.send('user doesnt exist')
    }

}

async function allUserInfo(req, res) {
    const userInfo = { id: req.user._id, username: req.user.username }
    res.json(await userModel.getAllUserInfo(userInfo))
}

async function userDeletion(req, res) {
    await todoListModel.removeAllCreatedBy(req.user._id)
    await todoModel.removeAllCreatedBy(req.user._id)
    await userModel.removeUser(req.user._id)
    res.send({ message: 'everything has been delete about this user' })
}

module.exports = { createUser, loginUser, allUserInfo, userDeletion }