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
import { layoutStyles, componentStyles } from '../../styles/styles';

const ImageCard = ({ file, techId, id, handleDelete }) => {
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
        <CardActionArea
          style={{ textAlign: 'center' }}
          onClick={() => {
            openInNewTab();
          }}>
          <img
            alt={file.title}
            className={componentClasses.attachmentMedia}
            style={{ maxWidth: file.width }}
            src={
              file.data.thumbnails.find(
                (obj) => obj.key === 'directus-large-contain'
              ).url
            }
            title='image-display'
          />
        </CardActionArea>
        <CardContent className={componentClasses.attachmentContent}>
          <Typography
            onClick={() => {
              openInNewTab();
            }}
            variant='subtitle1'
            component='h5'>
            {file.title}
          </Typography>
          {techId === file.technician && (
            <IconButton
              onClick={() => handleDelete(id)}
              className={componentClasses.attachmentIcon}
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
