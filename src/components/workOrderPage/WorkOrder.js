import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkOrder } from '../../actions/workOrder';
import { getSpaceComponents } from '../../actions/component';

import RequestDetails from './RequestDetails';
import Spinner from '../layout/Spinner';
import { workOrderStyles } from '../../styles/GridStyles';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getCurrentTech } from '../../actions/tech';

const WorkOrder = ({
  getWorkOrder,
  match,
  getCurrentTech,
  components,
  getSpaceComponents,
  workOrder: { loading, current, spaceId },
}) => {
  useEffect(() => {
    getWorkOrder(match.params.id);
    getCurrentTech(match.params.techEmail);
    spaceId && getSpaceComponents(spaceId);
  }, [
    getWorkOrder,
    match.params.id,
    match.params.techEmail,
    getCurrentTech,
    getSpaceComponents,
    spaceId,
  ]);

  const classes = workOrderStyles();

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded
      >
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='requestDetails-content'
          id='requestDetails-header'
        >
          <Typography className={classes.heading}>Request Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestDetails workOrder={current} components={components} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded
      >
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='taskDetails-content'
          id='taskDetails-header'
        >
          <Typography className={classes.heading}>Task Details</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded
      >
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='attachment-content'
          id='attachment-header'
        >
          <Typography className={classes.heading}>Attachments</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

WorkOrder.propTypes = {
  workOrder: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getWorkOrder: PropTypes.func.isRequired,
  getCurrentTech: PropTypes.func.isRequired,
  components: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  workOrder: state.workOrder,
  components: state.component.components,
});

export default connect(mapStateToProps, {
  getWorkOrder,
  getCurrentTech,
  getSpaceComponents,
})(WorkOrder);
