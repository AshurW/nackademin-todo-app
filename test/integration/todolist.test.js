const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
const app = require('../../app')

const todoListModel = require('../../models/todoListModel')
const todoModel = require('../../models/todoModel')
const userModel = require('../../models/userModel')


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

        request(app)
            .get('/getTodoList')
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res).to.be.json
                expect(res).to.have.status(200)
                // expect(res.body).to.include({
                //     todoListName: createTodoList.todoListName,
                //     createdBy: userId
                // })
            })
    })
    it('should get the todoList and all of its todo', async function () {
        const userId = this.test.user._id
        const todoList = { todoListName: 'ITesting List', todoArray: [], createdBy: userId }
        const createdTodoList = await todoListModel.createList(todoList)
        const todoItem = { title: 'Test Title1', done: 'false', createdBy: userId }
        const todo = await todoModel.insertTodo(todoItem)
        const insertedTodoList = await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo._id })

        const todoListData = { todoListId: createdTodoList._id }

        request(app)
            .get('/getTodoListAndAllTodos')
            .set('Content-Type', `application/json`)
            .send(todoListData)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                }
                expect(res).to.be.json
                expect(res).to.have.status(200)
                // console.log(res.body.todoArray.length)
                expect(res.body).to.include({
                    todoListName: todoList.todoListName,
                    createdBy: userId
                })
                expect(res.body.todoArray.length).to.be.equal(1)
            })

    })
})