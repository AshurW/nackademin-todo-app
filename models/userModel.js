require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'this is a secret'

const dataStore = require('nedb')
var userCollection

if (process.env.ENV === 'TEST') {
    var userCollection = new dataStore({
        filename: __dirname + '/../database/test/user.db',
        autoload: true,
        timestampData: true
    });
} else {
    var userCollection = new dataStore({
        filename: __dirname + '/../database/user.db',
        autoload: true,
        timestampData: true
    });
}

function insertUser(user) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
            const newUser = {username: user.username, password: hashedPassword, role: user.role}
            userCollection.insert(newUser, (err, newDoc) => {
                if (err) {
                    console.log(err)
                }
                resolve(newDoc)
            })
        })
    })
}

function loginUser(user) {
    return new Promise((resolve, reject) => {
        userCollection.findOne({username: user.username}, (err, doc) => {
            if (err) {
                console.log(err)
            }
            bcrypt.compare(user.password, doc.password, (err, result) => {
                if(!result) {
                    resolve('wrong user information')
                } else {
                    const token = jwt.sign(doc, jwtSecret, {expiresIn: '1h'})
                    resolve({
                        message: 'login success',
                        token
                    })
                }
            })
        })
    })
}

module.exports = {userCollection, insertUser, loginUser}