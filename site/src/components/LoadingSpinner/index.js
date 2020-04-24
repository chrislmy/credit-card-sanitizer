import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  spinnerInactive: {
    display: 'none'
  },
  spinnerContainer: {
    position: 'absolute',
    zIndex: '10',
    height: '100%',
    width: '100%',
    background: 'rgb(0, 0, 0, 0.9)'
  },
  spinner: {
    position: 'absolute',
    border: '6px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '6px solid #00e9de',
    width: '4rem',
    height: '4rem',
    '-webkit-animation': '$spin 1.5s linear infinite', /* Safari */
    animation: '$spin 1.5s linear infinite',
    zIndex: '15',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    top: '33%'
  },
  /* Safari */
  '@-webkit-keyframes spin': {
    '0%': { '-webkit-transform': 'rotate(0deg)' },
    '100%': { '-webkit-transform': 'rotate(360deg)' }
  },
  '@keyframes spin': {
    '0%': { 'transform': 'rotate(0deg)' },
    '100%': { 'transform': 'rotate(360deg)' }
  }
}));

const LoadingSpinnerView = ({ isLoading }) => {
  const classes = useStyles();
  const spinnerClassName = isLoading ? classes.spinnerContainer: classes.spinnerInactive;

  return (
    <div className={spinnerClassName}>
      <div className={classes.spinner}></div>
    </div>
  );
};

const mapStateToProps = ({ requests }, { loadingRequestName }) => {
  const isLoading = requests[loadingRequestName] && requests[loadingRequestName].isLoading;
  return { isLoading };
};

LoadingSpinnerView.propTypes = {
  isLoading: PropTypes.bool
};

const LoadingSpinner = connect(mapStateToProps)(LoadingSpinnerView);

export default LoadingSpinner;