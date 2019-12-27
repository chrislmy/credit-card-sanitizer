import React from 'react';
import SanitizationConfig from '../../components/SanitizationConfig';
import { Typography, makeStyles } from '@material-ui/core';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import OtherFunctions from '../../components/OtherFunctions';
import ErrorHandling from '../../components/ErrorHandling';
import ExternalLink from '../../components/ExternalLink';
import QuickStart from '../../components/QuickStart';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  },
  code: {
    fontSize: '1.2em'
  }
}));

const Guide = () => {
  const classes = useStyles();

  return (
    <Container>
      <QuickStart/>
      <SanitizationConfig />
      <Typography className={classes.title} variant="h3">
        Length of card numbers
      </Typography>
      <Divider />
      <Typography variant="body1">
        The <code className={classes.code}>cardNumberUpperBound</code> and{' '}
        <code className={classes.code}>cardNumberLowerBound </code>
        can be used to search for card numbers with the number of digits you
        desire.{' '}
        <strong>
          The default upper bound is 16 and the default lower bound is 15.
        </strong>
        &nbsp;This is because major card issuers such as VISA and Mastercard
        produce cards which are 16 digits with the exception of AMEX which are
        15 digits. More info about the different type of card numbers can be
        found{' '}
        <ExternalLink href="https://en.wikipedia.org/wiki/Payment_card_number">
          here
        </ExternalLink>
        .
      </Typography>
      <Typography variant="body1">
        <strong>
          Note: It is encouraged to narrow the boundary between the upper bound
          and lower bound where possible. A higher gap between boundaries could
          potentially lead to some false positives.
        </strong>
      </Typography>
      <OtherFunctions />
      <ErrorHandling />
    </Container>
  );
};

export default Guide;
