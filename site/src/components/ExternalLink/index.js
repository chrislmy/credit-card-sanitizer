import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  linkWithStyle: {
    textDecoration: 'none'
  },
  linkWithoutStyles: {
    color: 'inherit', 
    textDecoration: 'inherit'
  }
}));

const ExternalLink = ({ href, children, withStyle = true }) => {
  const classes = useStyles();

  return (
    <a
      className={withStyle ? classes.linkWithStyle : classes.linkWithoutStyles} 
      href={href} 
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  withStyle: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ExternalLink;