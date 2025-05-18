import { observer } from 'mobx-react-lite';
import { Checkbox, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { todoStore } from '../stores/TodoStore.ts';

const TodoList = observer(() => {
  return (
    <List>
      {todoStore.todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => todoStore.removeTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox checked={todo.done} onChange={() => todoStore.toggleTodo(todo.id)} />
          <ListItemText primary={todo.title} />
        </ListItem>
      ))}
    </List>
  );
});

export default TodoList;
