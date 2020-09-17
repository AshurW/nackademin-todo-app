const mongoose = require('mongoose')
const app = require('./app')

if(process.env.ENV === 'STAG') {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('connected to DB'))
}

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('Connected to Server'))