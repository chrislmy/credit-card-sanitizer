import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Container from '../Container';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1),
    background: '#326b96',
    height: '4.5rem',
    color: '#fff'
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container>
        <Typography variant="body1">Copyright © 2019 Min Yi Christopher Lau</Typography>
      </Container>
    </footer>
  );
};

export default Footer;


