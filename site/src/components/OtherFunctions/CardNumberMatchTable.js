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
  createRow('startIndex', 'The start index of the match in the given string.'),
  createRow('endIndex', 'The end index of the match in the given string.'),
  createRow('originalPayload', 'The original card number match without it\'s illegal characters removed'),
  createRow('maskedPayload', 'The masked card number match.'),
]);

const CardNumberMatchTable = () => {
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
            <TableCell><Typography variant="h3">Field Name</Typography></TableCell>
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

export default CardNumberMatchTable;


