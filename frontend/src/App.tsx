import './App.css';
import { observer } from 'mobx-react-lite';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import AddTodoFrom from './components/AddTodoFrom.tsx';
import TodoList from './components/TodoList.tsx';
import { todoStore } from './stores/TodoStore.ts';
import { useEffect } from 'react';

const App = observer(() => {
  useEffect(() => {
    const load = async () => {
      await todoStore.loadTodos();
    };

    load();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          TO-DO List
        </Typography>
        <AddTodoFrom />
        {todoStore.error && (
          <Box mt={2}>
            <Alert severity="error">{todoStore.error}</Alert>
          </Box>
        )}
        {todoStore.loading ? <CircularProgress sx={{ mt: 2 }} /> : <TodoList />}
      </Box>
    </Container>
  );
});

export default App;
