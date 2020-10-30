import React from 'react';
import Reader from 'react-qr-reader';

const QrReader = ({ handleScan }) => {
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Reader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: '100%' }}
    />
  );
};

export default QrReader;
