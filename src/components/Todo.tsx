import React, { useEffect, useState } from "react";
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
  LinearProgress,
} from "@material-ui/core";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";
import { useInView } from "react-intersection-observer";
import { TodoType } from "store/actions/TodoActionTypes";

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
  const [pageNumber, setPageNumber] = useState(1);
  const [localTodos, setLocalTodos] = useState<TodoType[]>([]);

  const todoState = useSelector((state: RootStore) => state.todos);
  const todos = todoState.todos;

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const loadTodos = async () => {
    if (todoState.loading) {
      return;
    }
    const el = document.querySelector("#scroll-box");
    if (el) {
      const scrollTop = el.scrollTop;
      userId && (await dispatch(GetTodos(userId, pageNumber)));
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      el.scrollTo(0, scrollTop);
    }
  };

  useEffect(() => {
    if (todos) {
      setLocalTodos((prevTodos) => [...prevTodos, ...todos]);
    }
  }, [todos]);

  useEffect(() => {
    if (inView) {
      loadTodos();
    }
    // eslint-disable-next-line
  }, [inView]);

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
      <div ref={ref}>{inView ? null : <LinearProgress />}</div>
    </Box>
  );
};

export default Todo;
