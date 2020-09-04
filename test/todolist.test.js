const chai = require('chai')
const { expect } = chai

const todoListModel = require('.././models/todoListModel')
const todoModel = require('.././models/todoModel')
const userModel = require('../models/userModel')

describe('CRUD on todolist', () => {
    beforeEach(async () => {
        await todoListModel.todoListCollection.remove({}, {multi: true}, function (err, numRemoved) {
        });
        await todoModel.todoCollection.remove({}, {}, function (err, numRemoved) {
        });
        await userModel.userCollection.remove({}, {}, function (err, numRemoved) {
        });
    })
    it('should create a todolist', async () => {
        //arrange
        const todoList = { todoListName: 'Testing List', todoArray: [], createdBy: 'test user' }

        //act
        const createdTodoList = await todoListModel.createList(todoList)

        //assert
        expect(createdTodoList.todoListName).to.be.equal(todoList.todoListName)
        expect(createdTodoList.createdBy).to.be.equal(todoList.createdBy)
    })
    it('should add a todo to the todoList', async () => {
        //arrange
        const todoList = { todoListName: 'Testing List', todoArray: [], createdBy: 'test user' }
        const createdTodoList2 = await todoListModel.createList(todoList)
        const todoItem = { title: 'Test Title', done: 'false', createdBy: 'test user' }

        //act
        const todo = await todoModel.insertTodo(todoItem)
        const insertTodoInList = await todoListModel.insertTodoInList({ todoListId: createdTodoList2._id, todoId: todo._id })

        //assert
        console.log(insertTodoInList)
        // expect(createdTodoList.todoArray).to.include(todo._id)
    })
})

