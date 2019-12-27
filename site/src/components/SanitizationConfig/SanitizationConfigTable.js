import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 650,
  }
}));

const createRow = (fieldName, description) => ({
  fieldName,
  description
});

const createRows = () => ([
  createRow('maskingCharacter', 'The character used to mask digits of the credit number. The default is X.'),
  createRow('exposeFirst', 'The number of leading digits of the credit card number to leave unmasked. The default is 6.'),
  createRow('exposeLast', 'The number of trailing digits of the credit card number to leave unmasked. The default is 4.'),
  createRow('invalidSeparators', 'An array of characters which are considered invalid delimiters when searching of matches of card numbers in a string. The default is - (dashes) and whitespaces.'),
  createRow('cardNumberUpperBound', 'The upper boundary of card number digits when the sanitizer searches for card numbers. The default is 16.'),
  createRow('cardNumberLowerBound', 'The lower boundary of card number digits when the sanitizer searches for card numbers. The default is 15.'),
]);

const SanitizationConfigTable = () => {
  const classes = useStyles();
  const rows = createRows();
  const tableRows = rows.map(row => (
    <TableRow key={row.fieldName}>
      <TableCell component="th" scope="row">
        <Typography variant="body1">{row.fieldName}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{row.description}</Typography>
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size="small" aria-label="sanitization config table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h3">Property</Typography></TableCell>
            <TableCell align="left"><Typography variant="h3">Description</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SanitizationConfigTable;


