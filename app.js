const express = require('express')
const app = express()

app.use(express.urlencoded({ exteded: true }))
app.use(express.json())

app.listen(8080, () => console.log('Connected to Server'))