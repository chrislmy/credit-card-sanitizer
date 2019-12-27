import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { makeStyles } from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '1.1em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    }
  }
}));

const CodeBlock = ({ codeSnippet, language }) => {
  const classes = useStyles();

  return (
    <SyntaxHighlighter
      className={classes.root}
      language={language}
      style={tomorrowNight}
    >
      {codeSnippet}
    </SyntaxHighlighter>
  );
};

CodeBlock.propTypes = {
  codeSnippet: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default CodeBlock;
