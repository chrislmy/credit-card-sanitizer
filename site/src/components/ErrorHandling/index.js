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

const ErrorHandling = () => {
  const classes = useStyles();
  const codeSnippet = `
  SanitizerConfig config = SanitizerConfig.builder()
    .invalidSeparators(new char[]{'*', ' ', '['})
    .build();
    CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);

  try {
    defaultSanitizer.sanitize(input);
  } catch (InvalidSeparatorsException ex) {
    ... Do something with the exception
  }
  `;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Error Handling</Typography>
      <Divider/>
      <Typography variant="body1">
        The underlying implementation of this library uses regex strings to search for potential card number matches. 
        On rare occasions, an invalid set of separators may be passed into the sanitizer config. If this is the case, 
        an <code className={classes.code}>InvalidSeparatorsException</code> is thrown. 
        It is recommended that this exception is handled when dealing with many and complicated invalid separators.
      </Typography>
      <CodeBlock
        codeSnippet={codeSnippet}
        language="java"
      />
    </Fragment>
  );
};

export default ErrorHandling;


