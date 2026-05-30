<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const store = useTodoStore()
const title = ref('')

onMounted(async () => {
  await store.fetchTodos()
})

function addTodo() {
  if (!title.value.trim()) return

  store.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h1>📝 Todo Manager</h1>

      <div class="add-section">
        <input
          v-model="title"
          @keyup.enter="addTodo"
          placeholder="What needs to be done?"
        />

        <button @click="addTodo">
          Add
        </button>
      </div>

      <p v-if="store.loading">
        Loading...
      </p>

      <p v-if="store.error" class="error">
        {{ store.error }}
      </p>

      <ul class="todo-list">
        <li
          v-for="todo in store.todos"
          :key="todo.id"
          class="todo-item"
        >
          <label>
            <input
              type="checkbox"
              :checked="todo.is_done"
              @change="store.toggleTodo(todo)"
            />

            <span :class="{ done: todo.is_done }">
              {{ todo.title }}
            </span>
          </label>

          <button
            class="delete-btn"
            @click="store.deleteTodo(todo.id)"
          >
            ✕
          </button>
        </li>
      </ul>

      <div class="footer">
        Total Tasks: {{ store.todos.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 40px;
  background: #f5f7fb;
}

.card {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.add-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-section input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.add-section button {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #f8f9fa;
}

.done {
  text-decoration: line-through;
  opacity: .6;
}

.delete-btn {
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: 18px;
}

.error {
  color: red;
}

.footer {
  margin-top: 16px;
  text-align: center;
  color: #666;
}
</style>