import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import { uploadFile } from '../../actions/workOrder';

import { dropzoneStyles } from '../../styles/AttachmentStyles';

const DropZoneDialog = ({
  uploadFile,
  studioId,
  workorderId,
  currentFiles,
}) => {
  const classes = dropzoneStyles();
  const [expanded, setExpanded] = useState(false);
  const [fileObjects, setFileObjects] = useState();

  return !expanded ? (
    <Button
      variant='contained'
      color='primary'
      onClick={() => setExpanded(true)}>
      Add Attachment
    </Button>
  ) : (
    <Fragment>
      <DropzoneAreaBase
        onAdd={(fileObjs) => setFileObjects(fileObjs)}
        onDelete={() => setFileObjects()}
        onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
        fileObjects={fileObjects}
        filesLimit={1}
        showFileNames
        previewText=''
        previewGridProps={{
          container: { spacing: 5, justify: 'center' },
          item: { xs: 2 },
        }}
        previewGridClasses={{ item: classes.item }}
      />
      <div className={classes.btns}>
        <Button
          onClick={() => {
            setExpanded(false);
            setFileObjects();
          }}
          className={classes.btn}
          variant='contained'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            uploadFile(fileObjects[0], studioId, workorderId, currentFiles);
            setExpanded(false);
            setFileObjects();
          }}
          className={classes.btn}
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
  workorderId: PropTypes.number.isRequired,
};

export default connect(null, { uploadFile })(DropZoneDialog);
