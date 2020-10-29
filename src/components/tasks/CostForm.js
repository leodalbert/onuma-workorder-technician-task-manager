import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import NumberFormat from './NumberFormat';
const CostForm = ({
  classes,
  costTasks,
  handleRemoveCost,
  handleAddCost,
  handleCostChange,
  costForm,
}) => {
  return (
    <Fragment>
      <Grid className={classes.lableGrid} item xs={12} sm={3}>
        <div style={{ paddingTop: '15px' }} className={classes.lable}>
          Material Costs:
        </div>
      </Grid>
      <Grid className={classes.detailGrid} item xs={12} sm={9}>
        {costTasks.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className={classes.costHead}>
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
            <Grid item xs={9}>
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
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Tooltip
                disableHoverListener={!!costForm.description}
                enterDelay={500}
                title='Add description and amount to add cost!'
                placement='bottom'>
                <span>
                  <Button
                    disabled={!costForm.description || !costForm.cost}
                    onClick={() => handleAddCost()}
                    style={{ padding: '7px 15px' }}
                    variant='contained'
                    color='secondary'
                    fullWidth>
                    Add
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

CostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  costTasks: PropTypes.array.isRequired,
  handleRemoveCost: PropTypes.func.isRequired,
  handleAddCost: PropTypes.func.isRequired,
  handleCostChange: PropTypes.func.isRequired,
  costForm: PropTypes.object.isRequired,
};

export default CostForm;
