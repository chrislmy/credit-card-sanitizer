import React, { Fragment } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Divider from '../Divider';
import Badge, { BADGE_TYPE } from '../Badge';
import ExternalLink from '../ExternalLink';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  },
  licenseBadge: {
    marginRight: theme.spacing(1)
  },
  travisBadge: {
    marginLeft: theme.spacing(1)
  }
}));

const Overview = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">Overview</Typography>
      <Divider />
      <span className={classes.licenseBadge}><Badge badgeType={BADGE_TYPE.license}/></span>
      <span className={classes.travisBadge}><Badge badgeType={BADGE_TYPE.travis}/></span>
      <Typography variant="body1">
        Users of your application may enter sensitive information such as credit
        card numbers where they shouldn&apos;t. If a credit card number is entered
        into a form on a website or an app, it may get stored into a database or
        logged. This is likely undesirable for a business, since it can be very
        hard to get rid of a stored card numbers on multiple places in a system.
      </Typography>
      <Typography variant="body1">
        Removal of credit card information is an important element in compliance
        with the Payment Card Industry Data Security Standard <ExternalLink href="https://www.pcisecuritystandards.org">(PCI DSS)</ExternalLink>.
      </Typography>
      <Typography variant="body1">
        This Java library scans text for potential matches of credit card
        numbers and applies the <ExternalLink href="https://www.geeksforgeeks.org/luhn-algorithm/">Luhn checksum algorithm</ExternalLink>
        &nbsp;to verify if the found match is a valid credit card number. These card numbers are then
        &apos;masked&apos; by replacing some or all of the digits with a replacement
        character. The library also provide other useful utility functions when
        searching for occurrences of of credit card numbers.
      </Typography>
    </Fragment>
  );
};

export default Overview;


