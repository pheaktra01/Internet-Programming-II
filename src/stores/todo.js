import { defineStore } from "pinia";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3100';

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        this.todos = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        if (this.todos[foundIndex].completedAt != null) {
          this.todos[foundIndex].completedAt = null;
        } else {
          this.todos[foundIndex].completedAt = new Date().toISOString();
        }
      }
    },
    addTodo(todo) {
      this.todos.push({
        id: this.todos.length + 1,
        name: todo,
        description: "description",
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
      this.todos = JSON.parse(JSON.stringify(this.todos));
    },
    clearAll() {
      this.todos = [];
    },
  },
});
