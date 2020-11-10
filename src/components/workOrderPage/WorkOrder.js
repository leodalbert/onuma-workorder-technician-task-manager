import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkOrder } from '../../actions/workOrder';
import { getSpaceComponents } from '../../actions/component';

import RequestDetails from './RequestDetails';
import PreviousTasks from '../tasks/PreviousTasks';
import TaskDetails from '../tasks/TaskDetails';
import AttachmentPage from '../attachments/AttachmentPage';
import Spinner from '../layout/Spinner';
import { layoutStyles } from '../../styles/styles';

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
  siteGroup,
  workOrderStatus,
  workOrder: {
    loading,
    current,
    currentSpaceInfo: { spaceId },
  },
}) => {
  useEffect(() => {
    getWorkOrder(params.id, params.studioId);
  }, [getWorkOrder, params.id, params.studioId]);
  useEffect(() => {
    spaceId && getSpaceComponents(spaceId, params.studioId);
  }, [getSpaceComponents, spaceId, params.studioId]);
  useEffect(() => {
    getCurrentTech(params.techEmail, params.studioId);
  }, [getCurrentTech, params.techEmail, params.studioId]);
  useEffect(() => {
    siteGroup && getTechs(params.studioId, siteGroup);
  }, [siteGroup, getTechs, params.studioId]);

  const layoutClasses = layoutStyles();

  return loading ? (
    <Spinner />
  ) : (
    <div className={layoutClasses.accordionRoot}>
      <Accordion square defaultExpanded>
        <AccordionSummary
          className={layoutClasses.accordionHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='requestDetails-content'
          id='requestDetails-header'>
          <Typography className={layoutClasses.accordionHeading}>
            Request Details
          </Typography>
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
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={layoutClasses.accordionHeader}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='taskDetails-content'
            id='taskDetails-header'>
            <Typography className={layoutClasses.accordionHeading}>
              Previous Tasks
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <PreviousTasks studioId={params.studioId} />
          </AccordionDetails>
        </Accordion>
      )}
      {workOrderStatus !== 'Completed' && (
        <Accordion square defaultExpanded>
          <AccordionSummary
            className={layoutClasses.accordionHeader}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='taskDetails-content'
            id='taskDetails-header'>
            <Typography className={layoutClasses.accordionHeading}>
              Task Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TaskDetails studioId={params.studioId} />
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion square defaultExpanded>
        <AccordionSummary
          className={layoutClasses.accordionHeader}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='attachment-content'
          id='attachment-header'>
          <Typography className={layoutClasses.accordionHeading}>
            Attachments
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AttachmentPage studioId={params.studioId} />
        </AccordionDetails>
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
  siteGroup: PropTypes.number,
};

const mapStateToProps = (state) => ({
  workOrder: state.workOrder,
  workOrderStatus: state.workOrder.current.status,
  components: state.component.components,
  tasks: state.workOrder.current.tasks,
  siteGroup: state.tech.siteGroup,
});

export default connect(mapStateToProps, {
  getWorkOrder,
  getCurrentTech,
  getSpaceComponents,
  getTechs,
})(WorkOrder);
