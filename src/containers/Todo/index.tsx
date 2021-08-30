import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { CheckCircle, CheckCircleOutline } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationLayout from 'src/components/PaginationLayout';
import { getTodoData } from 'src/state/todo/actions';

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type Props = {
  userId: number;
};

const Todo: React.FC<Props> = ({ userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localTodos, setLocalTodos] = useState<TodoData[]>([]);

  const { loading, todos } = useSelector((state: ReduxStore) => ({
    todos: state.todo.data,
    loading: state.common.todoLoading,
  }));

  useEffect(() => {
    if (todos) {
      setLocalTodos((prevTodos) => [...prevTodos, ...todos]);
    }
  }, [todos]);

  const loadTodoData = async (userId: number, pageNumber: number) => {
    await dispatch(getTodoData(userId, pageNumber));
  };

  const todoList =
    localTodos &&
    localTodos.map((todo) => (
      <List key={todo.id}>
        <ListItem>
          <ListItemText>{todo.title}</ListItemText>
          <Checkbox
            icon={<CheckCircleOutline />}
            checkedIcon={<CheckCircle />}
            checked={todo.completed}
          />
        </ListItem>
        <Divider />
      </List>
    ));

  return (
    <Box
      id="scroll-box"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        height: '280px',
        overflow: 'auto',
      }}
    >
      {loading ? (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ) : (
        todoList
      )}
      <PaginationLayout
        userId={userId}
        loadData={loadTodoData}
      ></PaginationLayout>
    </Box>
  );
};

export default Todo;
