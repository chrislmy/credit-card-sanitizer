import React from 'react';
import { Typography, makeStyles, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Container from '../Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6em',
    }
  },
  navbarButtons: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6em',
    }
  },
  link: {
    color: 'inherit', 
    textDecoration: 'inherit'
  },
  spacing: {
    flexGrow: 1
  },
  toolbar: {
    padding: 0
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const homePath = `${process.env.PUBLIC_URL}/`;
  const guidePath = `${process.env.PUBLIC_URL}/guide`;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Typography className={classes.logoText} variant="h4">
                <Link className={classes.link} to={homePath}>Credit Card Sanitizer</Link>
              </Typography>
            </IconButton>
            <span className={classes.spacing}></span>
            <Button className={classes.navbarButtons} color="inherit"><Link className={classes.link} to={homePath}>Home</Link></Button>
            <Button className={classes.navbarButtons} color="inherit"><Link className={classes.link} to={guidePath}>Guide</Link></Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
