import React from 'react';
import NumberFormat from 'react-number-format';

export default (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      style={{ padding: '10.5px 14px' }}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale='2'
    />
  );
};
