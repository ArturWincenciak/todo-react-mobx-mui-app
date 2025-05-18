import './App.css';
import { observer } from 'mobx-react-lite';
import { Box, Container, Typography } from '@mui/material';
import AddTodoFrom from "./components/AddTodoFrom.tsx";

const App = observer(() => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          TO-DO List
        </Typography>
        <AddTodoFrom />
      </Box>
    </Container>
  );
});

export default App;
