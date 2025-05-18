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
  const reset = await API.get<TodoDto[]>('/');
  return reset.data;
};
