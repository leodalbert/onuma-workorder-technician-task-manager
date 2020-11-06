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

import { attachmentPageStyles } from '../../styles/AttachmentStyles';

const FileCard = ({ file, techId, id, handleDelete }) => {
  const classes = attachmentPageStyles();

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
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            // style={{ color: 'blue' }}
            component='h5'>
            {file.filename_download}
          </Typography>
          <div>
            {techId === file.technician && (
              <IconButton
                onClick={() => handleDelete(id)}
                className={classes.icon}
                size='small'>
                <DeleteForeverIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.icon}
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
