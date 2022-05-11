import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 220,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#98FB98',
    color: theme.palette.common.black,
  },
  root:{
    padding:'8px',
    fontFamily:'STKaiti',
    fontSize: 18,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: '#F0FFF0',
  },
}))(TableRow);

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const tabledata = props.data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(tabledata.tabledata.length);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
            <StyledTableCell><Button variant="outlined" color="primary">记录</Button></StyledTableCell>
              {tabledata.tablecolumn.map((column) => (
                <StyledTableCell
                  align='center'
                >
                  {column}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tabledata.tabledata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.id}
                </StyledTableCell>
                {
                  row.value.map(function(value){
                  return <StyledTableCell align="center">{value}</StyledTableCell>
                  })
                }
                <StyledTableCell><Button variant="outlined" color="secondary">删除</Button></StyledTableCell>
              </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
