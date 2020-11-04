import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Grid,
  CardContent,
  Typography,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import { attachmentPageStyles } from '../../styles/AttachmentStyles';

const FileCard = ({ file }) => {
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
        <CardActionArea
          onClick={() => {
            openInNewTab();
          }}>
          <CardContent className={classes.content}>
            <Typography variant='h6' component='h5'>
              {file.filename_download}
            </Typography>
            <Typography
              variant='subtitle1'
              component='h5'
              className={classes.icon}>
              <GetAppIcon />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

FileCard.propTypes = {
  file: PropTypes.object.isRequired,
};

export default FileCard;
