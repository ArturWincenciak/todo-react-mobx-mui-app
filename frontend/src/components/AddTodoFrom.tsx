import { useState } from "react";
import { todoStore } from '../stores/TodoStore';
import {Box, Button, TextField} from "@mui/material";

const AddTodoFrom = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(title.trim()) {
      todoStore.addTodo(title.trim());
      setTitle('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <TextField
        fullWidth
        label="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add
      </Button>
    </Box>
  );
}

export default AddTodoFrom;