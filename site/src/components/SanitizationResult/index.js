import React from 'react';
import { connect } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';
import Divider from '../../components/Divider';
import CodeBlock from '../../components/CodeBlock';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import { TRY_IT_YOURSELF } from '../../state/request/requestNames';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  panel: {
    marginTop: theme.spacing(1.5),
    border: '1px #b2aeae solid',
    borderRadius: '0.5rem 0.5rem 0 0',
    padding: theme.spacing(1.5)
  }
}));

const SanitizationResult = ({ sanitizationResult, cardNumberMatches }) => {
  const classes = useStyles();
  
  let cardNumberMatchesString = '';
  cardNumberMatches.forEach((match, index) => { 
    const padding = '  ';
    const string = index > 0 ? (padding + match.maskedPayload) : match.maskedPayload;
    cardNumberMatchesString += `${string}\n`; 
  });

  const codeSnippet = `
  ${sanitizationResult}

  Masked card numbers
  ${cardNumberMatchesString}
  `;

  return (
    <div className={classes.root}>
      <LoadingSpinner loadingRequestName={TRY_IT_YOURSELF} />
      <div className={classes.panel}>
        <Typography variant="h4">Result</Typography>
        <Divider />
        <CodeBlock codeSnippet={codeSnippet} language="java" />
      </div>
    </div>
  );
};

SanitizationResult.propTypes = {
  sanitizationResult: PropTypes.string,
  cardNumberMatches: PropTypes.array,
};

const mapStateToProps = ({ 
  tryItYourselfForm : { 
    result: {
      sanitizationResult,
      cardNumberMatches 
    } 
  } 
}) => ({ sanitizationResult, cardNumberMatches });

export default connect(mapStateToProps)(SanitizationResult);