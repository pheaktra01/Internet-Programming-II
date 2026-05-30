import { gql } from '@apollo/client/core'

export const GET_TODOS = gql`
  query GetTodos {
    todos: todo(order_by: { created_at: desc }) {
      id
      title
      is_done
      created_at
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insert_todo_one(object: { title: $title }) {
      id
      title
      is_done
      created_at
    }
  }
`

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: uuid!, $done: Boolean!) {
    update_todo_by_pk(pk_columns: { id: $id }, _set: { is_done: $done }) {
      id
      is_done
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todo_by_pk(id: $id) {
      id
    }
  }
`

export const TODOS_SUB = gql`
  subscription TodosSub {
    todos: todo(order_by: { created_at: desc }) {
      id
      title
      is_done
      created_at
    }
  }
`