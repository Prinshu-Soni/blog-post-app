import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, resetAddPostResponseData } from 'src/state/post/actions';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      '& > *': {
        width: '100%',
      },
    },
    actionButton: {
      marginTop: '24px',
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

const AddPost: React.FC<AddPostProps> = (addPostProps: AddPostProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, addPostSuccess, addPostFailed } = useSelector(
    (state: ReduxStore) => ({
      addPostSuccess: state.post.addPostResponseData,
      loading: state.common.addPostLoading,
      addPostFailed: state.post.error,
    })
  );
  const [alert, setAlert] = useState({ type: '', message: '' });
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        title: '',
        body: '',
      },
      onSubmit: (values: IAddPostForm, actions) => {
        addNewPost(values, actions.resetForm);
      },
      validationSchema: Yup.object().shape({
        title: Yup.string().required('Please enter title'),
        body: Yup.string().required('Please enter body'),
      }),
    });

  const addNewPost = async (data: IAddPostForm, resetForm: Function) => {
    await dispatch(addPost(data));
    resetForm({});
  };

  useEffect(() => {
    if (addPostSuccess) {
      setAlert({
        type: 'success',
        message: 'Post added successfully',
      });
    }
    if (addPostFailed) {
      setAlert({
        type: 'error',
        message: 'Failed to add post',
      });
    }
  }, [addPostSuccess, addPostFailed]);

  return (
    <form onSubmit={handleSubmit}>
      {alert && (alert.type === 'success' || alert.type === 'error') && (
        <Alert
          severity={alert.type}
          onClose={() => {
            dispatch(resetAddPostResponseData());
            setAlert({ type: '', message: '' });
          }}
        >
          {alert.message}
        </Alert>
      )}
      {loading && <LinearProgress />}
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
          <Button type="button" onClick={() => addPostProps.onCancelClick()}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPost;
