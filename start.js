const app = require('./app')

const PORT = process.env.PORT || 8080
const IP = process.env.IP || '127.0.0.1'

app.listen(PORT, IP, () => console.log('Connected to Server'))