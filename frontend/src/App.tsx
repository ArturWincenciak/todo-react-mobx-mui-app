import './App.css';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import AddTodoFrom from './components/AddTodoFrom.tsx';
import TodoList from './components/TodoList.tsx';
import { todoStore } from './stores/TodoStore.ts';
import {useEffect} from "react";

const App = observer(() => {
  useEffect(() => {
    const load = async () => {
      try {
        await todoStore.loadTodos();
      } catch (err) {
        console.error('Error loading tasks', err);
      }
    };

    load().then(r => console.log("Done loading tasks", r));
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          TO-DO List
        </Typography>
        <AddTodoFrom />
        {todoStore.loading ? <CircularProgress sx={{ mt: 2 }} /> : <TodoList />}
      </Box>
    </Container>
  );
});

export default App;
