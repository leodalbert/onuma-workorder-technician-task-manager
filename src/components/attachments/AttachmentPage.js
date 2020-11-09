import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import ImageCard from './ImageCard';
import FileCard from './FileCard';
import DropZoneDialog from './DropZoneDialog';
import { deleteAttachment } from '../../actions/workOrder';
import { sortFilesByType } from '../../utils/helpers';

const AttachmentPage = ({
  files,
  studioId,
  workorderId,
  currentFiles,
  techId,
  deleteAttachment,
}) => {
  const handleDelete = (id) => {
    deleteAttachment(id, studioId);
  };
  return (
    <Grid container alignItems='stretch' spacing={2}>
      {files &&
        files.length > 0 &&
        files.sort(sortFilesByType).map(({ directus_files: file, id }) => {
          if (file.type.split('/')[0] === 'image') {
            return (
              <ImageCard
                key={file.id}
                file={file}
                id={id}
                techId={techId}
                handleDelete={handleDelete}
              />
            );
          } else {
            return (
              <FileCard
                key={file.id}
                file={file}
                id={id}
                techId={techId}
                handleDelete={handleDelete}
              />
            );
          }
        })}
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <DropZoneDialog
          studioId={studioId}
          workorderId={workorderId}
          currentFiles={currentFiles}
          techId={techId}
        />
      </Grid>
    </Grid>
  );
};

AttachmentPage.propTypes = {
  files: PropTypes.array.isRequired,
  studioId: PropTypes.string.isRequired,
  workorderId: PropTypes.number,
  techId: PropTypes.number.isRequired,
  deleteAttachment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.workOrder.currentFiles,
  workorderId: state.workOrder.current.id,
  currentFiles: state.workOrder.currentFiles,
  techId: Number(state.tech.id),
});

export default connect(mapStateToProps, { deleteAttachment })(AttachmentPage);
