import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { previousTaskStyles } from '../../styles/TaskStyles';

const PreviousTaskRow = ({ task, techName, taskCosts }) => {
  const classes = previousTaskStyles();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell component='th' scope='row'>
          {task.description}
        </TableCell>
        <TableCell style={{ padding: 0 }} align='left'>
          {task.hours}
        </TableCell>
        <TableCell padding='none' align='right'>
          {!!task.material_cost && (
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}>
              {open ? (
                <KeyboardArrowUpIcon className={classes.arrowUp} />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell align='left'>
          $&nbsp;{(Math.round(task.material_cost * 100) / 100).toFixed(2)}
        </TableCell>
        <TableCell style={{ padding: 0 }} align='left'>
          {dayjs(task.date).format('MM/DD/YYYY')}
        </TableCell>
        <TableCell align='left'>{techName(task)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table size='small' aria-label='costs'>
              <TableHead>
                <TableRow>
                  <TableCell width='33%' className={classes.head} align='right'>
                    Description
                  </TableCell>

                  <TableCell width='16%' className={classes.head} align='right'>
                    Cost
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskCosts
                  .filter((cost) => cost.workorder_task === task.id)
                  .map((cost) => {
                    return (
                      <TableRow key={cost.id}>
                        <TableCell align='right' component='th' scope='row'>
                          {cost.description}
                        </TableCell>

                        <TableCell align='right'>
                          $&nbsp;
                          {(Math.round(cost.cost * 100) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell className={classes.head} align='right'>
                    Total:
                  </TableCell>

                  <TableCell className={classes.head} align='right'>
                    $&nbsp;
                    {(Math.round(task.material_cost * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

PreviousTaskRow.propTypes = {
  task: PropTypes.object.isRequired,
  techName: PropTypes.func.isRequired,
  taskCosts: PropTypes.array.isRequired,
};

export default PreviousTaskRow;

//<Typography variant='h6' component='div'>
//   Material Costs
// </Typography>
