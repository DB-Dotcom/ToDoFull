<template>
    <div class="todo-item">
      <input type="checkbox" :checked="todo.completed" @change="toggleComplete" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="deleteTodo">Löschen</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      todo: {
        type: Object,
        required: true
      },
      updateTodo: {
        type: Function,
        required: true
      },
      deleteTodo: {
        type: Function,
        required: true
      }
    },
    methods: {
      toggleComplete() {
        const updatedTodo = {
          ...this.todo,
          completed: !this.todo.completed
        };
        this.updateTodo(updatedTodo);
      }
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  