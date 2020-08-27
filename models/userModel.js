const dataStore = require('nedb')

const userCollection = new dataStore({
    filename: __dirname + '/../database/user.db', 
    autoload: true, 
    timestampData: true
});

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

module.exports = {insertUser, loginUser}