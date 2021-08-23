import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "store/index";
import { GetUsers } from "store/actions/UserActions";
import UserProfile from "components/UserProfile";
import UserDetailsModal from "components/UserDetailsModal";
import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(4),
    height: "calc(100vh - 128px)",
    display: "flex",
  },
}));

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.users);
  const users = userState.users;

  useEffect(() => {
    if (users && users.length === 0) {
      dispatch(GetUsers());
    }
  }, [users, dispatch]);

  const handleUserClicked = (id: number, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
  };

  const handleResetUser = (id?: number) => {
    setSelectedUserId(undefined);
    setSelectedUserName("");
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
        {userState.loading ? <CircularProgress /> : usersList}
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

export default Users;
