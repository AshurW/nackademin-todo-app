const chai = require('chai')
const { expect } = chai
const db = require('./../../database/dbSetup')

const todoListModel = require('../../models/todoListModel')
const todoModel = require('../../models/todoModel')
const userModel = require('../../models/userModel')

describe('unit test CRUD on todolist model', () => {
    before(async () => {
        await db.connect()
    })
    after(async () => {
        await db.disconnect()
    })
    beforeEach(async () => {
        await todoListModel.TodoList.deleteMany({});
        await todoModel.Todo.deleteMany({});
        await userModel.User.deleteMany({});
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
        const createdTodoList = await todoListModel.createList(todoList)
        const todoItem = { title: 'Test Title', done: 'false', createdBy: 'test user' }
        const todo = await todoModel.insertTodo(todoItem)

        //act
        const insertTodoInList = await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo._id })

        //assert
        expect(insertTodoInList.todoArray).to.include(todo._id)
    })
    it('should get todoList', async () => {
        //arrange
        const arrangeData = await arrangeTodoList()

        //act
        const getTodoList = await todoListModel.getTodoList(arrangeData._id)

        //assert
        expect(getTodoList.todoListName).to.be.equal('Testing List')
        expect(getTodoList.todoArray.length).to.be.equal(3)
        expect(getTodoList.createdBy).to.be.equal('test user')

    })
    it('should get todoList and all of its todo', async () => {
        //arrange
        const arrangeData = await arrangeTodoList()

        //act
        const todoListAndAllTodo = await todoListModel.getTodoListAndAllTodos(arrangeData._id)

        //assert
        expect(todoListAndAllTodo.todoArray[0]).to.include({ title: 'Test Title1', done: false, createdBy: 'test user' })
        expect(todoListAndAllTodo.todoArray[1]).to.include({ title: 'Test Title2', done: false, createdBy: 'test user' })
        expect(todoListAndAllTodo.todoArray[2]).to.include({ title: 'Test Title3', done: false, createdBy: 'test user' })
    })
    it('should remove todolist and all of its todo', async () => {
        //arrange
        const arrangeData = await arrangeTodoList()

         //act
         const removedTodoList = await todoListModel.removeTodoListAndAllTodo(arrangeData._id)

         //assert
         expect(removedTodoList.message).to.be.equal('Removed all todos and the list')
    })
})

async function arrangeTodoList() {
    const todoList = { todoListName: 'Testing List', todoArray: [], createdBy: 'test user' }
    const createdTodoList = await todoListModel.createList(todoList)
    const todoItem = { title: 'Test Title1', done: 'false', createdBy: 'test user' }
    const todoItem2 = { title: 'Test Title2', done: 'false', createdBy: 'test user' }
    const todoItem3 = { title: 'Test Title3', done: 'false', createdBy: 'test user' }
    const todo = await todoModel.insertTodo(todoItem)
    const todo2 = await todoModel.insertTodo(todoItem2)
    const todo3 = await todoModel.insertTodo(todoItem3)
    await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo._id })
    await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo2._id })
    const insertTodoInList = await todoListModel.insertTodoInList({ todoListId: createdTodoList._id, todoId: todo3._id })
    return insertTodoInList
}

