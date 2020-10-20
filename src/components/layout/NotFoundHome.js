import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';

const NotFound = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 20 }}>
        <h1 className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle'></i> Please use email link
          to access your workorders!
        </h1>
      </Container>
    </Fragment>
  );
};

export default NotFound;
