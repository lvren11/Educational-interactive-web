import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import util from '../../../utils/util';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 257,
  },
  bt:{
    fontFamily:'STKaiti',
    fontSize: 18,
    backgroundColor: 'Transparent',
    backgroundRepeat:'no-repeat',
    border: 'none',
    cursor:'pointer',
    overflow: 'hidden',
    outline:'none'
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#F0FFF0',
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
  const [tabledata, settabledata] = React.useState(props.data);
  const [page] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(tabledata.tabledata.length);
  const handleClick = (id) => {
    const arr = tabledata;
    if(arr.tabledata.length !== 0){
      for(let i = 0; i <= arr.tabledata.length; i++){
        if(arr.tabledata[i] && arr.tabledata[i].id === id){
          arr.tabledata.splice(i, 1);;
        }
      }
      settabledata({
        name:arr.name,
        tablecolumn:arr.tablecolumn,
        tabledata:arr.tabledata
      });
      // setRowsPerPage(arr.tabledata.length);
      console.log(util.timetoformat() + "点击删除");
    }
  }

  useEffect(()=>{
    settabledata(props.data);
    setRowsPerPage(props.data.tabledata.length);
  },[props.data])
  
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
            {/* <StyledTableCell align='center'>记录</StyledTableCell> */}
              {tabledata.tablecolumn.map((column,index) => (
                <StyledTableCell
                  align='center'
                  key={index}
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
                {/* <StyledTableCell component="th" scope="row" align="center">
                  {row.id}
                </StyledTableCell> */}
                {
                  row.value.map(function(value,index){
                  return <StyledTableCell align="center" key={index}>{value}</StyledTableCell>
                  })
                }
                <StyledTableCell align="center"><button className={classes.bt} onClick={() => handleClick(row.id)}>删除</button></StyledTableCell>
              </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
