import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import ExternalLink from '../ExternalLink';

const useStyles = makeStyles(theme => ({
  hero: {
    padding: theme.spacing(1),
    color: '#fff',
    fontWeight: 500,
    marginTop: theme.spacing(3),
    border: '1px solid #fff',
    '&:hover': {
      border: '1px solid #fff'
    }
  }
}));

const HeroButton = ({ href, children }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.hero}
      variant="outlined"
      color="primary"
    >
      <ExternalLink href={href} withStyle={false}>{children}</ExternalLink>
    </Button>
  );
};

HeroButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default HeroButton;
