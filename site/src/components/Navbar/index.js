import React from 'react';
import logo from '../../logo.png';
import {
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Container from '../Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: '2rem',
  },
  logoText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
  navbarButtons: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6em',
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  spacing: {
    flexGrow: 1,
  },
  toolbar: {
    padding: 0,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const homePath = '/';
  const guidePath = '/guide';
  const tryItPath = '/try-it-yourself';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Link className={classes.link} to={homePath}>
                <img className={classes.logo} src={logo} alt="logo" />
              </Link>
            </IconButton>
            <span className={classes.spacing}>
              <Typography className={classes.logoText} variant="h3">
                <Link className={classes.link} to={homePath}>
                  Credit Card Sanitizer
                </Link>
              </Typography>
            </span>
            <Button className={classes.navbarButtons} color="inherit">
              <Link className={classes.link} to={homePath}>
                Home
              </Link>
            </Button>
            <Button className={classes.navbarButtons} color="inherit">
              <Link className={classes.link} to={guidePath}>
                Guide
              </Link>
            </Button>
            <Button className={classes.navbarButtons} color="inherit">
              <Link className={classes.link} to={tryItPath}>
                Try It
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
