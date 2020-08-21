const apiURL = 'http://localhost:8080'

const app = new Vue({
    el:'#app',
    data: {
        todoItems: null,
        addTodoItem: null
    },
    async created () {
        await this.dataRefresh()
    },
    methods: {
        async addTodo () {
            const data = {
                todoTitle: this.addTodoItem,
                todoDone: false
            }
            console.log(data)
            fetch(`${apiURL}/addTodo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            })

            await this.dataRefresh()
            this.addTodoItem = null
        },
        async checkTodo (todoDone, todoId) {
            const data = {
                todoDone: !todoDone
            }
            fetch(`${apiURL}/checkTodo/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        async deleteTodo(todoId) {
            fetch(`${apiURL}/deleteTodo/${todoId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
            await this.dataRefresh()
        },
        async dataRefresh () {
            this.todoItems = null
            fetch(`${apiURL}/allTodos`)
            .then(res => res.json())
            .then(data => this.todoItems = data)
        }
    }
})
