require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoMemmory

async function connect() {
    if (process.env.ENV === 'STAGE' || process.env.ENV === 'PROD') {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('connected to STAGE/PROD DB'))
    } else if (process.env.ENV === 'TEST' || process.env.ENV === 'DEV') {
        mongoMemmory = new MongoMemoryServer({ binary: { version: '4.4.1' } })
        const uri = await mongoMemmory.getUri()
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('connected to TEST/DEV DB'))
    }
}

async function disconnect() {
    await mongoose.disconnect()
    if (process.env.ENV === 'TEST' || process.env.ENV === 'DEV') {
        await mongoMemmory.stop()
    }
}


module.exports = { connect, disconnect }