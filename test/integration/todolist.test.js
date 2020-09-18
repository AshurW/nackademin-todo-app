const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
const app = require('../../app')
const db = require('./../../database/dbSetup')

const todoListModel = require('../../models/todoListModel')
const todoModel = require('../../models/todoModel')
const userModel = require('../../models/userModel')


describe('Full on crud integreration test', function () {
    before(async () => {
        await db.connect()
    })
    after(async () => {
        await db.disconnect()
    })
    beforeEach(async function () {
        await todoListModel.TodoList.deleteMany({});
        await todoModel.Todo.deleteMany({});
        await userModel.User.deleteMany({});

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
    it('should login and create a todoList', async function () {
        const todoListData = { todoListName: 'ITesting list' }
        const userId = this.test.user._id

        await request(app)
            .post('/createTodoList')
            .set('authorization', `Bearer ${this.test.token}`)
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body).to.include({
                    todoListName: todoListData.todoListName,
                    createdBy: userId
                })
            })
    })
    it('should get the todoList', async function () {
        const userId = this.test.user._id
        const todoList = { todoListName: 'ITesting List', todoArray: [], createdBy: userId }
        const createdTodoList = await todoListModel.createList(todoList)

        const todoListData = { todoListId: createdTodoList._id }

        await request(app)
            .get('/getTodoList')
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(200)
            })
    })
    it('should get the todoList and all of its todo', async function () {
        const userId = this.test.user._id
        const todoList = { todoListName: 'ITesting List', todoArray: [], createdBy: userId }
        const createdTodoList = await todoListModel.createList(todoList)
        const todoItem = { title: 'Test Title1', done: 'false', createdBy: userId }
        const todo = await todoModel.insertTodo(todoItem)
        await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo._id })

        const todoListData = { todoListId: createdTodoList._id }

        await request(app)
            .get('/getTodoListAndAllTodos')
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res.body).to.include({
                    todoListName: todoList.todoListName,
                    createdBy: userId
                })
                expect(res.body.todoArray.length).to.be.equal(1)
            })

    })
})