const jwt = require('jsonwebtoken')

const jwtSecret = 'this is a secret'

function isAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.sendStatus(403)
    }
    const token = req.headers.authorization.replace('Bearer ', '')
    try {
        const payload = jwt.verify(token, jwtSecret)
        req.user = payload
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
}

module.exports = { isAuthenticated }