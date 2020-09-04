require('dotenv').config()
const dataStore = require('nedb')

var userCollection

if (process.env.ENV === 'TEST') {
    var userCollection = new dataStore({
        filename: '../database/test/user.db',
        autoload: true,
        timestampData: true
    });
} else {
    var userCollection = new dataStore({
        filename: __dirname + '../database/user.db',
        autoload: true,
        timestampData: true
    });
}

function insertUser(user) {
    return new Promise((resolve, reject) => {
        userCollection.insert(user, (err, newDoc) => {
            if (err) {
                console.log(err)
            }
            resolve(newDoc)
        })
    })
}

function loginUser(username) {
    return new Promise((resolve, reject) => {
        userCollection.find({username}, (err, docs) => {
            if (err) {
                console.log(err)
            }
            resolve(docs)
        })
    })
}

module.exports = {userCollection, insertUser, loginUser}