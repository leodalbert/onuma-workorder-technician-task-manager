import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';

const NotFound = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 20 }}>
        <h1 className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle'></i> Oops - something
          didn't work correctly! Use the link in your email to try accessing the
          work order again. If all fails, use the button at the top right to get
          in touch with us.
        </h1>
      </Container>
    </Fragment>
  );
};

export default NotFound;
