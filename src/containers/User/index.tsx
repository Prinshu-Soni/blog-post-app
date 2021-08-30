import { Box, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from 'src/components/UserProfile';
import UserDetailsModal from 'src/containers/User/UserDetailsModal';
import {
  resetAddPostResponseData,
  resetPostData,
} from 'src/state/post/actions';
import { resetTodoData } from 'src/state/todo/actions';
import { getUserData } from 'src/state/user/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4),
    height: 'calc(100vh - 128px)',
    display: 'flex',
  },
}));

const User: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, users } = useSelector((state: ReduxStore) => ({
    users: state.user.data,
    loading: state.common.userLoading,
  }));

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleUserClicked = (id: number, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
  };

  const handleResetUser = () => {
    setSelectedUserId(undefined);
    setSelectedUserName('');
    dispatch(resetTodoData());
    dispatch(resetPostData());
    dispatch(resetAddPostResponseData());
  };

  const usersList =
    users &&
    users.map((user) => (
      <Grid item xs={10} sm={5} md={3} key={user.id}>
        <UserProfile
          id={user.id}
          name={user.name}
          email={user.email}
          phone={user.phone}
          website={user.website}
          onClick={handleUserClicked}
        />
      </Grid>
    ));

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        {loading ? <CircularProgress /> : usersList}
        {selectedUserId && (
          <UserDetailsModal
            userId={selectedUserId}
            userName={selectedUserName}
            resetUser={handleResetUser}
          />
        )}
      </Grid>
    </Box>
  );
};

export default User;
