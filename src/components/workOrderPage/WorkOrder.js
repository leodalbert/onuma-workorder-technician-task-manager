import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkOrder } from '../../actions/workOrder';
import { getSpaceComponents } from '../../actions/component';

import RequestDetails from './RequestDetails';
import PreviousTasks from './PreviousTasks';
import Spinner from '../layout/Spinner';
import { workOrderStyles } from '../../styles/GridStyles';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getCurrentTech, getTechs } from '../../actions/tech';

const WorkOrder = ({
  getWorkOrder,
  match: { params },
  getCurrentTech,
  getTechs,
  components,
  getSpaceComponents,
  tasks,
  workOrder: { loading, current, spaceId },
}) => {
  useEffect(() => {
    spaceId && getSpaceComponents(spaceId, params.studioId);
  }, [getSpaceComponents, spaceId, params.studioId]);
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [getCurrentTech, params.techEmail, params.studioId]);
  useEffect(() => {
    getWorkOrder(params.id, params.studioId);
  }, [getWorkOrder, params.id, params.studioId]);
  useEffect(() => {
    getTechs(params.studioId);
  }, [getTechs, params.studioId]);

  const classes = workOrderStyles();

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='requestDetails-content'
          id='requestDetails-header'>
          <Typography className={classes.heading}>Request Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestDetails
            workOrder={current}
            components={components}
            studioId={Number(params.studioId)}
          />
        </AccordionDetails>
      </Accordion>
      {tasks.length > 0 && (
        <Accordion
          classes={{ expanded: classes.expanded }}
          square
          defaultExpanded>
          <AccordionSummary
            className={classes.header}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='taskDetails-content'
            id='taskDetails-header'>
            <Typography className={classes.heading}>Previous Tasks</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <PreviousTasks studioId={params.studioId} />
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='taskDetails-content'
          id='taskDetails-header'>
          <Typography className={classes.heading}>Task Details</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion
        classes={{ expanded: classes.expanded }}
        square
        defaultExpanded>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='attachment-content'
          id='attachment-header'>
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
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workOrder: state.workOrder,
  components: state.component.components,
  tasks: state.workOrder.current.tasks,
});

export default connect(mapStateToProps, {
  getWorkOrder,
  getCurrentTech,
  getSpaceComponents,
  getTechs,
})(WorkOrder);
