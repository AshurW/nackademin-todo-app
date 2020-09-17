const app = require('./app')
const db = require('./database/dbSetup')
const PORT = process.env.PORT || 8080

db.connect()
    .then(() => {
        app.listen(PORT, () => console.log('Connected to Server'))
    })

