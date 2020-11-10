import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { layoutStyles, componentStyles } from '../../styles/styles';

const FileCard = ({ file, techId, id, handleDelete }) => {
  const layoutClasses = layoutStyles();
  const componentClasses = componentStyles();

  const openInNewTab = () => {
    const newWindow = window.open(
      `${file.data.full_url}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid item xs={12}>
      <Card className={layoutClasses.root}>
        <CardContent className={componentClasses.attachmentContent}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            component='h5'>
            {file.filename_download}
          </Typography>
          <div>
            {techId === file.technician && (
              <IconButton
                onClick={() => handleDelete(id)}
                className={componentClasses.attachmentIcon}
                size='small'>
                <DeleteForeverIcon />
              </IconButton>
            )}
            <IconButton
              className={componentClasses.attachmentIcon}
              onClick={() => {
                openInNewTab();
              }}
              size='small'>
              <GetAppIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

FileCard.propTypes = {
  file: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  techId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default FileCard;
