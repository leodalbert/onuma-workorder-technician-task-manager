import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';

import SummaryHead from './SummaryHead';
import { getComparator, stableSort } from './SummaryFilters';
import { summaryTableStyles } from '../../styles/GridStyles';

const SummaryTable = ({ workOrders, history, setLoading, techEmail }) => {
  const classes = summaryTableStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('request_date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelect = (id) => {
    setLoading();
    history.push(`workorder/${id}/${techEmail}`);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, workOrders.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          size='medium'
          aria-label='enhanced table'>
          <SummaryHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={workOrders.length}
          />
          <TableBody>
            {stableSort(workOrders, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowSelect(row.id)}
                    tabIndex={-1}
                    key={row.id}>
                    <TableCell component='th' id={labelId} scope='row'>
                      {dayjs(row.request_date).format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell align='left'>{row.status}</TableCell>
                    <TableCell
                      className={
                        row.assigned_priority === 1 ? classes.urgent : ''
                      }
                      align='left'>
                      {row.request_description.split('\r\n')[0]}
                    </TableCell>
                    <TableCell align='left'>{row.request_number}</TableCell>
                    <TableCell align='left'>{row.building}</TableCell>
                    <TableCell align='left'>{row.space}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={workOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

SummaryTable.propTypes = {
  workOrders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  techEmail: PropTypes.string.isRequired,
};

export default withRouter(SummaryTable);
