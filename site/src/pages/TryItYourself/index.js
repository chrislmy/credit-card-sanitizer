import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Container from '../../components/Container';
import TryItYourselfForm from '../../components/TryItYourSelfForm';
import SanitizerCodeBlock from '../../components/SanitizerCodeBlock';
import SanitizationResult from '../../components/SanitizationResult';
import Divider from '../../components/Divider';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  }
}));

const TryItYourself = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.title} variant="h3">Try it yourself</Typography>
      <Divider />
      <TryItYourselfForm />
      <SanitizationResult />
      <SanitizerCodeBlock />
    </Container>
  );
};

export default TryItYourself;