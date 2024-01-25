<template>
    <div class="todo-list">
      <h2>Meine ToDo-Liste</h2>
      <div v-for="todo in todos" :key="todo._id">
        <todo-item
          :todo="todo"
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
        ></todo-item>
      </div>
      <input type="text" v-model="newTodoText" @keyup.enter="addTodo" placeholder="Neues ToDo hinzufügen" />
    </div>
  </template>
  
  <script>
  import { fetchTodos, addTodo, updateTodo, deleteTodo } from '@/api/todos';
  import TodoItem from './TodoItem.vue';
  
  export default {
    name: 'TodoList',
    components: {
      TodoItem
    },
    data() {
      return {
        todos: [],
        newTodoText: ''
      };
    },
    async created() {
      this.todos = await fetchTodos(this.$store.state.authToken);
    },
    methods: {
      async addTodo() {
        const newTodo = await addTodo(this.$store.state.authToken, this.newTodoText);
        this.todos.push(newTodo);
        this.newTodoText = '';
      },
      async updateTodo(updatedTodo) {
        await updateTodo(this.$store.state.authToken, updatedTodo._id, updatedTodo);
        const index = this.todos.findIndex(todo => todo._id === updatedTodo._id);
        this.todos[index] = updatedTodo;
      },
      async deleteTodo(todoId) {
        await deleteTodo(this.$store.state.authToken, todoId);
        this.todos = this.todos.filter(todo => todo._id !== todoId);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-list {
    /* Ihre Styles hier */
  }
  </style>
  