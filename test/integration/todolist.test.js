const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
const app = require('../../app')

const todoListModel = require('../../models/todoListModel')
const todoModel = require('../../models/todoModel')
const userModel = require('../../models/userModel')
const { set } = require('../../app')


describe('Full on crud integreration test', function () {
    beforeEach(async function () {
        await todoListModel.todoListCollection.remove({}, { multi: true });
        await todoModel.todoCollection.remove({}, { multi: true });
        await userModel.userCollection.remove({}, { multi: true });


        const userFields = {
            username: 'ashur',
            password: '123',
            role: 'admin'
        }
        this.currentTest.user = await userModel.insertUser(userFields)

        const userLogin = {
            username: 'ashur',
            password: '123',
        }
        this.currentTest.token = (await userModel.loginUser(userLogin)).token
    })
    it('should login and create a todoList', function () {
        const todoListData = { todoListName: 'ITesting list' }
        const userId = this.test.user._id

        request(app)
            .post('/createTodoList')
            .set('authorization', `Bearer ${this.test.token}`)
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .end(function (err, res) {
                expect(res).to.be.json
                expect(res.body).to.include({
                    todoListName: todoListData.todoListName,
                    createdBy: userId
                })
            })
    })
})