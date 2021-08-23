import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "store/index";
import { GetPosts } from "store/actions/PostActions";
import {
  List,
  ListItemText,
  ListItem,
  Box,
  Divider,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    cursor: "pointer",
  },
}));

const Posts = ({ userId }: { userId?: number }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const postState = useSelector((state: RootStore) => state.posts);
  const posts = postState.posts;

  useEffect(() => {
    if (userId) {
      dispatch(GetPosts(userId));
    }
  }, [userId, dispatch]);

  const postList =
    posts &&
    posts.map((post) => (
      <List key={post.id} className={classes.post}>
        <ListItem>
          <ListItemText>{post.title}</ListItemText>
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
      {postState.loading ? (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ) : (
        postList
      )}
    </Box>
  );
};

export default Posts;
