const userModel = require('../models/userModel')

async function createUser(req, res) {
    const newUser = { username: req.body.username, password: password, role: req.body.role }
    res.send(await userModel.insertUser(newUser))
}

async function loginUser(req, res) {
    const user = { username: req.body.username, password: req.body.password }
    res.json(await userModel.loginUser(user))
}

async function allUserInfo(req, res) {
    const userInfo = { id: req.user._id, username: req.user.username }
    res.json(await userModel.getAllUserInfo(userInfo))
}

module.exports = { createUser, loginUser, allUserInfo }