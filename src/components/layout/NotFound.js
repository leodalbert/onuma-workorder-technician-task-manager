import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';

const NotFound = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 20 }}>
        <h1 styles={{ margin: '30px' }} className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle'></i> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </Container>
    </Fragment>
  );
};

export default NotFound;
