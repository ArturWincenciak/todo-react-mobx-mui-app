import './App.css';
import { observer } from 'mobx-react-lite';
import { Box, Container, Typography } from '@mui/material';
import AddTodoFrom from "./components/AddTodoFrom.tsx";
import TodoList from "./components/TodoList.tsx";

const App = observer(() => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          TO-DO List
        </Typography>
        <AddTodoFrom />
        <TodoList />
      </Box>
    </Container>
  );
});

export default App;
