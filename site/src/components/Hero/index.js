import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import HeroButton from '../HeroButton';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
    background: '#326b96',
    textAlign: 'center',
    height: '17.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    maxWidth: '80rem'
  },
  heroSubheading: {
    marginTop: theme.spacing(2.5)
  },
  githubIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Hero = () => {
  const classes = useStyles();
  const iconClassName = `${classes.githubIcon} fab fa-github`;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1">Credit Card Sanitizer</Typography>
        <Typography className={classes.heroSubheading} variant="h2">
          Java library that prevents sensitive card numbers from being
          unintentionally provided
        </Typography>
        <HeroButton href="https://github.com/chrislmy/credit-card-sanitzer">
          <i className={iconClassName}></i> View on Github
        </HeroButton>
      </div>
    </div>
  );
};

export default Hero;
