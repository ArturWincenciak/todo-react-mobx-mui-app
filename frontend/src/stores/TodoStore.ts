import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api/todoApi';

export class TodoStore {
  todos: api.TodoDto[] = [];
  loading = false;
  error: string | null = null;

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

  async addTodo(title: string) {
    this.loading = true;
    this.error = null;
    try {
      const newTodo = await api.addTodo(title);
      runInAction(() => this.todos.push(newTodo));
    } catch {
      runInAction(() => (this.error = 'Error adding task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async toggleTodo(id: number) {
    this.loading = true;
    this.error = null;
    try {
      const toggledTodo = await api.toggleTodo(id);
      runInAction(() => {
        const index = this.todos.findIndex((t) => t.id == id);
        if (index !== -1) {
          this.todos[index] = toggledTodo;
        } else {
          this.error = 'Task not found';
        }
      });
    } catch {
      runInAction(() => (this.error = 'Error toggling task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async removeTodo(id: number) {
    this.loading = true;
    this.error = null;
    try {
      await api.deleteTodo(id);
      runInAction(() => this.todos.filter((t) => t.id !== id));
    } catch {
      runInAction(() => (this.error = 'Error removing task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}

export const todoStore = new TodoStore();
