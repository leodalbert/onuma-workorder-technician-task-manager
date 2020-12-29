import React, { Fragment } from 'react';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Container, Typography } from '@material-ui/core';

const LogoutPage = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 20, textAlign: 'center' }}>
        <Typography variant='subtitle1'>
          <EmojiPeopleIcon /> {``}Thanks for visiting, you are now logged out!
        </Typography>
        <Typography variant='body2'>
          Use the link in you email to log back in.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default LogoutPage;
