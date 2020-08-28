const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')
const jwtSecret = 'this is a secret'


async function createUser(req, res) {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const newUser = {username: req.body.username, password: hashedPassword, role: req.body.role}
        res.send(await userModel.insertUser(newUser))
    })
}

async function loginUser(req, res) {
    const userData = await userModel.loginUser(req.body.username)
    bcrypt.compare(req.body.password, userData[0].password, (err, result) => {
        if(!result) {
            res.json('wrong user information')
        } else {
            const token = jwt.sign(userData[0], jwtSecret)
            res.json({
                message: 'login success',
                token
            }).status(200)
        }
    })
}

module.exports = {createUser, loginUser}