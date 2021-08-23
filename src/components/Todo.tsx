import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "store/index";
import { GetTodos } from "store/actions/TodoActions";
import {
  List,
  ListItemText,
  ListItem,
  Box,
  Checkbox,
  Divider,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Todo = ({ userId }: { userId?: number }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const todoState = useSelector((state: RootStore) => state.todos);
  const todos = todoState.todos;

  useEffect(() => {
    if (userId) {
      dispatch(GetTodos(userId));
    }
  }, [userId, dispatch]);

  const todoList =
    todos &&
    todos.map((todo) => (
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
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        height: "280px",
        overflow: "auto",
      }}
    >
      {todoState.loading ? (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ) : (
        todoList
      )}
    </Box>
  );
};

export default Todo;
