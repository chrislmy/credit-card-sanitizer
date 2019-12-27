import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#eee',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      height: '2.5rem'
    }
  }
}));

const ShadedBlock = ({ children }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      {children}
    </div>
  );
};

ShadedBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ShadedBlock;