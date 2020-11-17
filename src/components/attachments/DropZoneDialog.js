import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import { uploadFile } from '../../actions/workOrder';

import { componentStyles, spacingStyles } from '../../styles/styles';

const DropZoneDialog = ({ uploadFile, studioId, workorderId, techId }) => {
  const componentClasses = componentStyles();
  const spacingClasses = spacingStyles();
  const [expanded, setExpanded] = useState(false);
  const [fileObjects, setFileObjects] = useState();

  return !expanded ? (
    <div className={componentClasses.btnBreak}>
      <Button
        style={{ width: '190px' }}
        variant='contained'
        color='secondary'
        onClick={() => setExpanded(true)}>
        Add Attachment
      </Button>
    </div>
  ) : (
    <Fragment>
      <DropzoneAreaBase
        onAdd={(fileObjs) => setFileObjects(fileObjs)}
        onDelete={() => setFileObjects()}
        fileObjects={fileObjects}
        filesLimit={1}
        showFileNames
        showAlerts={['error', 'info']}
        previewGridProps={{
          container: { spacing: 5, justify: 'center' },
          item: { xs: 2 },
        }}
        previewGridClasses={{ item: spacingClasses.marginTopS }}
      />
      <div className={componentClasses.btnRight}>
        <Button
          onClick={() => {
            setExpanded(false);
            setFileObjects();
          }}
          className={spacingClasses.marginS}
          variant='contained'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            uploadFile(fileObjects[0], studioId, workorderId, techId);
            setExpanded(false);
            setFileObjects();
          }}
          className={spacingClasses.marginS}
          color='secondary'
          variant='contained'>
          Upload
        </Button>
      </div>
    </Fragment>
  );
};

DropZoneDialog.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  studioId: PropTypes.string.isRequired,
  workorderId: PropTypes.number,
  techId: PropTypes.number.isRequired,
};

export default connect(null, { uploadFile })(DropZoneDialog);
