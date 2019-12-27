import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CodeBlock from '../CodeBlock';
import Divider from '../Divider';
import SanitizationConfigTable from './SanitizationConfigTable';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  },
  code: {
    fontSize: '1.1em'
  },
  sanitizerConfigUseCases: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '1em',
    fontWeight: 500,
    lineHeight: 1.5,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    }
  }
}));

const SanitizationConfig = () => {
  const classes = useStyles();
  const codeSnippet = `
  String input = "Hi, my card is 4111*1111*1111*1111 maybe you should not store that in your database!";
  
  SanitizerConfig config = SanitizerConfig.builder()
          .exposeFirst(0)
          .maskingCharacter('*')
          .invalidSeparators(new char[]{'*'})
          .build();
  CardNumberSanitizer sanitizer = new CardNumberSanitizer(config);
  
  String output = sanitizer.sanitize(input);

  // Output: Hi, my card is ************1111 maybe you should not store that in your database!
  `;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">
        Customizing the Sanitizer
      </Typography>
      <Divider />
      <Typography variant="body1">
        You might have different requirements for performing the masking of
        these card numbers for example:
      </Typography>
      <ul className={classes.sanitizerConfigUseCases}>
        <li>Requiring a specific masking character.</li>
        <li>
          Masking a specific part of the card number if not masking the whole
          number.
        </li>
        <li>Searching for card numbers with a specific length.</li>
      </ul>
      <Typography>
        For this reason, the{' '}
        <code className={classes.code}>CardNumberSanitizer</code> class also
        accepts a<code className={classes.code}> SanitizerConfig</code> when
        instantiated using the constructor. Below is an example usage:
      </Typography>
      <CodeBlock codeSnippet={codeSnippet} language="java" />
      <Typography variant="body1">
        Below is a table describing the{' '}
        <code className={classes.code}> SanitizerConfig</code> properties.
      </Typography>
      <SanitizationConfigTable />
    </Fragment>
  );
};

export default SanitizationConfig;
