import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CodeBlock from '../CodeBlock';
import Divider from '../Divider';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  },
  code: {
    fontSize: '1.1em'
  }
}));

const QuickStart = () => {
  const classes = useStyles();
  const codeSnippet = `
  String input = "Hi, my card is 4111 1111 1111 1111 maybe you should not store that in your database!";
  CardNumberSanitizer sanitizer = new CardNumberSanitizer();
  String output = sanitizer.sanitize(input);

  // Output: Hi, my card is 411111XXXXXX1111 maybe you should not store that in your database!
  `;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Quick Start</Typography>
      <Divider/>
      <Typography variant="body1">
        The <code className={classes.code}>CardNumberSanitizer</code> class contains the utility functions to sanitize or search of occurrences of card numbers.
        The most basic usage of the class is used as described below:
      </Typography>
      <CodeBlock
        codeSnippet={codeSnippet}
        language="java"
      />
    </Fragment>
  );
};

export default QuickStart;


