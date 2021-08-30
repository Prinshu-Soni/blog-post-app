import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
}));

type Props = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  childern?: React.ReactNode;
  onClick: (id: number, name: string) => void;
};

const UserProfile: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Grid item key={props.id}>
      <Paper
        className={classes.card}
        elevation={10}
        onClick={() => props.onClick(props.id, props.name)}
      >
        <Typography variant="h6">{props.name}</Typography>
        <Typography>{props.email}</Typography>
        <Typography>{props.phone}</Typography>
        <Typography>{props.website}</Typography>
      </Paper>
    </Grid>
  );
};

export default UserProfile;
