import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import ImageCard from './ImageCard';
import FileCard from './FileCard';
import DropZoneDialog from './DropZoneDialog';
import { sortFilesByType } from '../../utils/helpers';

const AttachmentPage = ({ files, studioId, workorderId }) => {
  return (
    <Grid container alignItems='stretch' spacing={2}>
      {files.length > 0 &&
        files.sort(sortFilesByType).map(({ directus_files: file }) => {
          if (file.type.split('/')[0] === 'image') {
            return <ImageCard key={file.id} file={file} />;
          } else {
            return <FileCard key={file.id} file={file} />;
          }
        })}
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <DropZoneDialog studioId={studioId} workorderId={workorderId} />
      </Grid>
    </Grid>
  );
};

AttachmentPage.propTypes = {
  files: PropTypes.array.isRequired,
  studioId: PropTypes.string.isRequired,
  workorderId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.workOrder.currentFiles,
  workorderId: state.workOrder.current.id,
});

export default connect(mapStateToProps)(AttachmentPage);
