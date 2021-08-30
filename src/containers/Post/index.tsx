import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationLayout from 'src/components/PaginationLayout';
import { getPostData } from 'src/state/post/actions';

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    cursor: 'pointer',
  },
}));

type Props = {
  userId: number;
};

const Post: React.FC<Props> = ({ userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localPosts, setLocalPosts] = useState<PostData[]>([]);

  const { loading, posts } = useSelector((state: ReduxStore) => ({
    posts: state.post.data,
    loading: state.common.postLoading,
  }));

  useEffect(() => {
    if (posts) {
      setLocalPosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  const loadPostData = async (userId: number, pageNumber: number) => {
    await dispatch(getPostData(userId, pageNumber));
  };

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
        postList
      )}
      <PaginationLayout
        userId={userId}
        loadData={loadPostData}
      ></PaginationLayout>
    </Box>
  );
};

export default Post;
