import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CodeBlock from '../CodeBlock';
import Divider from '../Divider';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  }
}));

const Installation = () => {
  const classes = useStyles();
  const codeSnippet = `
  <dependency>
    <groupId>com.github.chrislmy</groupId>
    <artifactId>credit-card-sanitizer</artifactId>
    <version>1.1.2</version>
  </dependency>
  `;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Installation</Typography>
      <Divider/>
      <Typography variant="body1">
        In order to use this library in your project, simply add the following dependency:
      </Typography>
      <CodeBlock
        codeSnippet={codeSnippet}
        language="xml"
      />
    </Fragment>
  );
};

export default Installation;


