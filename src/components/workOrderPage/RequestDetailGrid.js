import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';

import { priority, insertBreak } from '../../utils/helpers';

import { requestDetailsGridStyles } from '../../styles/GridStyles';

const RequestDetailGrid = ({ workOrder }) => {
  const classes = requestDetailsGridStyles();
  const {
    request_number,
    request_date,
    assigned_priority,
    request_email,
    submitted_by,
    building,
    floor,
    space,
    request_description,
    location_description,
    request_telephone,
    due_date,
    administrator_to_technician_comment,
  } = workOrder;

  let FIELDS = [
    { lable: 'Request Number:', detail: request_number },
    {
      lable: 'Request Date:',
      detail: dayjs(request_date).format('MM/DD/YYYY h:m A'),
    },
    {
      lable: 'Priority:',
      detail: priority(assigned_priority),
      detailColor: assigned_priority === 1 && 'redDetail',
    },
    {
      lable: 'Submited By:',
      detail: insertBreak([
        <a
          key={request_email}
          style={{ textDecoration: 'none' }}
          href={
            'mailto:' +
            request_email +
            `?subject=Workorder request for room ${space.number} in ${building.name}`
          }
        >{`${submitted_by} (${request_email})`}</a>,
        request_telephone && (
          <a
            key={request_telephone}
            style={{ textDecoration: 'none' }}
            href={'tel:' + request_telephone}
          >
            {request_telephone}
          </a>
        ),
      ]),
    },
    {
      lable: 'Location:',
      detail: [
        `${building.number} ${(building.number || building.name) && '- '}${
          building.name
        }`,
        <br key='1' />,
        floor.name && floor.name,
        floor.name && <br key='2' />,
        `${space.number} ${(space.number || space.name) && '- '}${space.name}`,
        location_description && <br key='3' />,
        location_description && location_description,
      ],
    },
    {
      lable: 'Request Description:',
      detail: insertBreak(request_description.split('\r\n')),
    },
  ];

  //   Optional fields
  due_date &&
    FIELDS.splice(3, 0, {
      lable: 'Due Date:',
      detail: dayjs(due_date).format('MM/DD/YYYY'),
      detailColor: 'redDetail',
    });

  administrator_to_technician_comment &&
    FIELDS.push({
      lable: 'Administrator Comments:',
      detail: administrator_to_technician_comment,
    });

  return _.map(FIELDS, ({ lable, detail, detailColor }) => {
    return (
      <Fragment key={lable}>
        <Grid className={classes.lableGrid} item xs={12} sm={4} lg={5}>
          <div className={classes.lable}>{lable}</div>
        </Grid>
        <Grid className={classes.detailGrid} item xs={12} sm={8} lg={7}>
          <div className={detailColor ? classes[detailColor] : classes.detail}>
            {detail}
          </div>
        </Grid>
      </Fragment>
    );
  });
};

RequestDetailGrid.propTypes = {
  workOrder: PropTypes.object.isRequired,
};

export default RequestDetailGrid;
