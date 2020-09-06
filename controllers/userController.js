const userModel = require('../models/userModel')

async function createUser(req, res) {
    const newUser = { username: req.body.username, password: password, role: req.body.role }
    res.send(await userModel.insertUser(newUser))
}

async function loginUser(req, res) {
    const user = { username: req.body.username, password: req.body.password }
    res.json(await userModel.loginUser(user))
}

module.exports = { createUser, loginUser }