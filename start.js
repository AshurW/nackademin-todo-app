const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 8080

if(process.env.ENV === 'STAG') {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('connected to DB'))
}

app.listen(PORT, () => console.log('Connected to Server'))