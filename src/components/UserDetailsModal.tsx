import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import UserActionTabs from "./UserActionTabs";
import { Divider, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AddPost from "components/AddPost";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: "none",
    width: "500px",
    minHeight: "400px",
  },
  divider: {
    marginTop: "16px",
  },
  add: {
    marginTop: "8px",
    float: "right",
  },
}));

type Props = {
  userId?: number;
  userName: string;
  resetUser: (id?: number) => void;
};

const UserDetailsModal = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [addPostFormVisible, setAddPostFormVisible] = useState<boolean>(false);
  const [activeTabItem, setActiveTabItem] = useState<number>(0);

  const handleClose = () => {
    setOpen(false);
    props.resetUser(props.userId);
  };

  useEffect(() => {
    if (props.userId) {
      setOpen(true);
    }
  }, [props.userId]);

  const setActiveTab = (index: number) => {
    setActiveTabItem(index);
  };

  const handleAddClicked = () => {
    if (activeTabItem === 1) {
      setAddPostFormVisible(true);
    }
  };

  const handleAddPostCancelClick = () => {
    setAddPostFormVisible(false);
    setActiveTabItem(0);
  };

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {`${props.userName} ${addPostFormVisible ? "- Add Post" : ""}`}
            {!addPostFormVisible && (
              <Fragment>
                <Divider className={classes.divider} />
                <UserActionTabs
                  userId={props.userId}
                  activeTab={setActiveTab}
                />
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.add}
                  onClick={handleAddClicked}
                >
                  <Add />
                </Fab>
              </Fragment>
            )}
            {addPostFormVisible && (
              <AddPost onCancelClick={handleAddPostCancelClick} />
            )}
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default UserDetailsModal;
