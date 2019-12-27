import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid #c7c7c7',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  }
}));

const Divider = () => {
  const classes = useStyles();

  return (
    <hr className={classes.root} ></hr>
  );
};

export default Divider;
