import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CodeBlock from '../CodeBlock';
import Divider from '../Divider';
import CardNumberMatchTable from './CardNumberMatchTable';
import ShadedBlock from '../ShadedBlock';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  },
  code: {
    fontSize: '1.1em'
  }
}));

const OtherFunctions = () => {
  const classes = useStyles();
  const analyzeCodeSnippet = `
  CardNumberSanitizer sanitizer = new CardNumberSanitizer();
  boolean containsCardNumbers = sanitizer.analyze(input);
  
  if(containsCardNumbers) {
    log("Oh dear someone entered something they shouldn't have!")
  } else {
    log("All good :)")
  }
  `;

  const deepSanitizeCodeSnippet = `
  CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);
  SanitizationResult output = defaultSanitizer.deepSanitize(input);

  System.out.println("Sanitized string: " + output.result());

  for (CardNumberMatch match : output.cardNumberMatches()) {
    System.out.println("Original: " + match.originalPayload() + " Masked: " + match.maskedPayload());
  }
  `;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Other Functions</Typography>
      <Divider/>
      <ShadedBlock><Typography variant="h4">analyze()</Typography></ShadedBlock>
      <Typography variant="body1">
        The <code className={classes.code}>CardNumberSanitizer</code> class contains an <strong>analyze</strong> method which performs 
        a light weight analysis on an input string and returns a boolean indicating if the string has valid card numbers or not.
      </Typography>
      <CodeBlock
        codeSnippet={analyzeCodeSnippet}
        language="java"
      />
      <ShadedBlock><Typography variant="h4">deepSanitize()</Typography></ShadedBlock>
      <Typography variant="body1">
        A <strong>deepSanitize</strong> method is also available if you wish to not only sanitize the input string but also obtain 
        a list of <code className={classes.code}>CardNumberMatch</code> objects in the form of a <code className={classes.code}>SanitizationResult</code>.
      </Typography>
      <CodeBlock
        codeSnippet={deepSanitizeCodeSnippet}
        language="java"
      />
      <Typography variant="body1">The <code className={classes.code}>CardNumberMatch</code> class has the following fields:</Typography>
      <CardNumberMatchTable/>
    </Fragment>
  );
};

export default OtherFunctions;


