import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api/todoApi';

export class TodoStore {
  todos: api.TodoDto[] = [];
  loading = false;
  error: string | null = null;
  nextId = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTodos() {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.fetchTodos();
      runInAction(() => (this.todos = data));
    } catch {
      runInAction(() => (this.error = 'Error loading tasks'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  addTodo(title: string) {
    this.todos.push({
      id: this.nextId++,
      title,
      done: false,
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id == id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id != id);
  }
}

export const todoStore = new TodoStore();
