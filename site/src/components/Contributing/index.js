import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Divider from '../Divider';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  }
}));

const Contributing = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Contributing or raising issues</Typography>
      <Divider/>
      <Typography variant="body1">
        If you find any issues when using this library 
        please feel free to reach out to me at my email <a href="mailto:lmy6088@gmail.com">lmy6088@gmail.com</a> 
        &nbsp;or raise an issue in this repo with a short description of the encountered issue. 
        Please feel free to raise issues for feedback as well if you think there are ways to improve the code.
      </Typography>
      <Typography variant="body1">
        If you are comfortable, feel free to raise a pull request as well to 
        address any issues but please ensure that they pass the unit test suite.
      </Typography>
    </Fragment>
  );
};

export default Contributing;


