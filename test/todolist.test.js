const chai = require('chai')
const { expect } = chai

const todoListModel = require('.././models/todoListModel')
const todoModel = require('.././models/todoModel')
const userModel = require('../models/userModel')

describe('CRUD on todolist', () => {
    beforeEach(async () => {
        await todoListModel.todoListCollection.remove({}, {multi: true});
        await todoModel.todoCollection.remove({}, {multi: true});
        await userModel.userCollection.remove({}, {multi: true});
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
        expect(insertTodoInList.affectedDocuments.todoArray).to.include(todo._id)
    })
})

