import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Grid,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { attachmentPageStyles } from '../../styles/AttachmentStyles';

const ImageCard = ({ file, techId, id, handleDelete }) => {
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
          style={{ textAlign: 'center' }}
          onClick={() => {
            openInNewTab();
          }}>
          <img
            alt={file.title}
            className={classes.media}
            style={{ maxWidth: file.width }}
            src={
              file.data.thumbnails.find(
                (obj) => obj.key === 'directus-large-contain'
              ).url
            }
            title='image-display'
          />
        </CardActionArea>
        <CardContent className={classes.content}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            // style={{ color: 'blue' }}
            component='h5'>
            {file.title}
          </Typography>
          {techId === file.technician && (
            <IconButton
              onClick={() => handleDelete(id)}
              className={classes.icon}
              size='small'>
              <DeleteForeverIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

ImageCard.propTypes = {
  file: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  techId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageCard;
