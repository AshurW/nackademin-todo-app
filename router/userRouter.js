const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')
const authMiddle = require('../middleware/authMiddle')

userRouter.post('/createUser', userController.createUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/userInfo', authMiddle.isAuthenticated, userController.allUserInfo)
userRouter.delete('/userDeletion', authMiddle.isAuthenticated, userController.userDeletion)

module.exports = userRouter