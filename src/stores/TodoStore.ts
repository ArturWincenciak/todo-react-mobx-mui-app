import { makeAutoObservable } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export class TodoStore {
  todos: Todo[] = [];
  nextId = 1;

  constructor() {
    makeAutoObservable(this);
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
