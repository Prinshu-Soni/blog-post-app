import React, { useEffect, useState } from "react";
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
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { PostType } from "store/actions/PostActionTypes";

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
  const [pageNumber, setPageNumber] = useState(1);
  const [localPosts, setLocalPosts] = useState<PostType[]>([]);

  const postState = useSelector((state: RootStore) => state.posts);
  const posts = postState.posts;

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const loadPosts = async () => {
    if (postState.loading) {
      return;
    }
    const el = document.querySelector("#scroll-box");
    if (el) {
      const scrollTop = el.scrollTop;
      userId && (await dispatch(GetPosts(userId, pageNumber)));
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      el.scrollTo(0, scrollTop);
    }
  };

  useEffect(() => {
    if (posts) {
      setLocalPosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  useEffect(() => {
    if (inView) {
      loadPosts();
    }
    // eslint-disable-next-line
  }, [inView]);

  const postList =
    localPosts &&
    localPosts.map((post) => (
      <List key={post.id} className={classes.post}>
        <ListItem>
          <ListItemText>{post.title}</ListItemText>
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
      {postState.loading ? (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ) : (
        postList
      )}
      <div ref={ref}>{inView ? null : <LinearProgress />}</div>
    </Box>
  );
};

export default Posts;
