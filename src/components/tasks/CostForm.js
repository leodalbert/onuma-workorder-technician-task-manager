import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { componentStyles, layoutStyles } from '../../styles/styles';

import NumberFormat from './NumberFormat';
const CostForm = ({
  costTasks,
  handleRemoveCost,
  handleAddCost,
  handleCostChange,
  costForm,
}) => {
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();
  return (
    <Fragment>
      <Grid className={layoutClasses.labelCtr} item xs={12} sm={3}>
        <Typography
          variant='subtitle1'
          style={{ paddingTop: '15px' }}
          className={layoutClasses.labelStyle}>
          Material costs:
        </Typography>
      </Grid>
      <Grid className={layoutClasses.detailCtr} item xs={12} sm={9}>
        {costTasks.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={layoutClasses.tableCell}>
                <TableHead>
                  <TableRow
                    className={clsx(
                      layoutClasses.backgroundColorMain,
                      layoutClasses.tableCell
                    )}>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell padding='checkbox'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {costTasks.map((cost, index) => (
                    <TableRow key={index}>
                      <TableCell>{cost.description}</TableCell>
                      <TableCell>
                        $&nbsp;
                        {(Math.round(cost.cost * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <Button
                          onClick={() => handleRemoveCost(index)}
                          variant='text'
                          size='small'>
                          <ClearIcon fontSize='small' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label='Description'
            fullWidth
            value={costForm.description}
            onChange={(e) => handleCostChange(e)}
            name='description'
            id='cost-description'
            margin='dense'
            variant='outlined'
            multiline
            rowsMax={3}
          />
          <Grid container item xs={12}>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={5}>
                <TextField
                  placeholder='Amount'
                  fullWidth
                  variant='outlined'
                  value={costForm.cost}
                  onChange={(e) => handleCostChange(e)}
                  name='cost'
                  id='formatted-numberformat-input'
                  InputProps={{
                    inputComponent: NumberFormat,
                    type: 'text',
                    startAdornment: (
                      <InputAdornment position='start'>$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={7} className={componentClasses.btnBreak}>
                <Tooltip
                  disableHoverListener={!!costForm.description}
                  enterDelay={500}
                  title='Add description and amount to add cost!'
                  placement='bottom'>
                  <span>
                    <Button
                      className={componentClasses.btnWidth}
                      disabled={!costForm.description || !costForm.cost}
                      onClick={() => handleAddCost()}
                      variant='contained'
                      color='secondary'>
                      Add Cost
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

CostForm.propTypes = {
  costTasks: PropTypes.array.isRequired,
  handleRemoveCost: PropTypes.func.isRequired,
  handleAddCost: PropTypes.func.isRequired,
  handleCostChange: PropTypes.func.isRequired,
  costForm: PropTypes.object.isRequired,
};

export default CostForm;
