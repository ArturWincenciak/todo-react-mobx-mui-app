import axios from 'axios';

export interface TodoDto {
  id: number;
  title: string;
  done: boolean;
}

const API = axios.create({
  baseURL: 'http://localhost:5128/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodos = async () => {
  const response = await API.get<TodoDto[]>('/');
  return response.data;
};

export const addTodo = async (title: string) => {
  const newTodo = { id: 0, title, done: false };
  const response = await API.post<TodoDto>('/', newTodo);
  return response.data;
};

export const toggleTodo = async (id: number) => {
  const response = await API.patch<TodoDto>(`/${id}/toggle`);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await API.delete(`/${id}`);
};
