import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Grid,
  CardContent,
  Typography,
} from '@material-ui/core';

import { attachmentPageStyles } from '../../styles/AttachmentStyles';

const ImageCard = ({ file }) => {
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
          <img
            alt={file.title}
            className={classes.media}
            src={
              file.data.thumbnails.find(
                (obj) => obj.key === 'directus-large-contain'
              ).url
            }
            title='image-display'
          />
          <CardContent className={classes.content}>
            <Typography variant='h6' component='h5'>
              {file.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

ImageCard.propTypes = {
  file: PropTypes.object.isRequired,
};

export default ImageCard;
