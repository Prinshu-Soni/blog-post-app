import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  LinearProgress,
} from "@material-ui/core";
import { AddNewPost } from "store/actions/PostActions";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { RootStore } from "store";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      "& > *": {
        width: "100%",
      },
    },
    actionButton: {
      marginTop: "24px",
    },
  })
);

interface IAddPostForm {
  title: string;
  body: string;
}

type AddPostProps = {
  onCancelClick: () => void;
};

const AddPost = (addPostProps: AddPostProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const postState = useSelector((state: RootStore) => state.posts);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const addNewPost = (data: IAddPostForm, resetForm: Function) => {
    dispatch(AddNewPost(data));
    resetForm({});
  };

  useEffect(() => {
    if (postState.addPost && postState.addPost.status) {
      postState.addPost.status === 201
        ? setAlert({
            type: "success",
            message: "Post added successfully",
          })
        : setAlert({
            type: "error",
            message: "Failed to add post",
          });
    }
  }, [postState]);

  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
      }}
      onSubmit={(values: IAddPostForm, actions) => {
        addNewPost(values, actions.resetForm);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Please enter title"),
        body: Yup.string().required("Please enter body"),
      })}
    >
      {(props: FormikProps<IAddPostForm>) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
        } = props;
        return (
          <Form>
            {alert && (alert.type === "success" || alert.type === "error") && (
              <Alert
                severity={alert.type}
                onClose={() => {
                  setAlert({ type: "", message: "" });
                }}
              >
                {alert.message}
              </Alert>
            )}
            {postState.loading && <LinearProgress />}
            <Grid container justifyContent="space-around" direction="row">
              <Grid
                item
                lg={10}
                md={10}
                sm={10}
                xs={10}
                className={classes.textField}
              >
                <TextField
                  name="title"
                  id="title"
                  label="Title"
                  value={values.title}
                  type="text"
                  helperText={errors.title && touched.title && errors.title}
                  error={errors.title && touched.title ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={10}
                xs={10}
                className={classes.textField}
              >
                <TextField
                  multiline
                  name="body"
                  id="body"
                  label="Body"
                  value={values.body}
                  rows={6}
                  helperText={errors.body && touched.body && errors.body}
                  error={errors.body && touched.body ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={10}
                xs={10}
                className={classes.actionButton}
              >
                <Button
                  type="button"
                  onClick={() => addPostProps.onCancelClick()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPost;
