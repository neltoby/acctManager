import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux'
import { Typography } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    topup: {
      minWidth: 500,
    },
    bodyBold: {
      fontSize: 20,
      fontWeight: 'bold'
    },
  });

const TransferTable = () => {
    const classes = useStyles();
    const store = useSelector(state => state)
    let abClass = store.trans.transType.type === 'transfer' ? classes.table : classes.topup ;
    return (
      <>
        {store.trans.transTypeResult.length ?
            <TableContainer component={Paper}>
                <Table className={abClass} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="right">Amount</StyledTableCell>
                            {store.trans.transType.type === 'transfer' ?
                              <>
                                <StyledTableCell align="right">Bank</StyledTableCell>
                                <StyledTableCell align="right">Account</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                              </> :
                              <>
                                <StyledTableCell align="right">Phone Number</StyledTableCell>
                              </>
                              }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.trans.transTypeResult.map((row, i ) => 

                          store.trans.transType.type === 'transfer' ?
                          (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.DateTime}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Amt}</StyledTableCell>
                                <StyledTableCell align="right">{row.Bank}</StyledTableCell>
                                <StyledTableCell align="right">{row.Credited}</StyledTableCell>
                                <StyledTableCell align="right">{`${row.FirstName} ${row.LastName}`}</StyledTableCell>
                            </StyledTableRow>
                        ): (
                          <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.DateTime}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Amt}</StyledTableCell>
                                <StyledTableCell align="right">{row.Phone}</StyledTableCell> 
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : 
            <Typography component='div' variant="body2" className={classes.bodyBold}>
                You have not made any recent {store.trans.transType.type === 'transfer' ? 'transfer' : 'top-up'}
            </Typography>
        }
      </>
    );
};

export default TransferTable;