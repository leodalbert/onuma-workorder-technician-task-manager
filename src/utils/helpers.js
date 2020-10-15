import React from 'react';

// function returns priority level string from number
export const priority = (num) => {
  const levels = [
    'Not specified',
    'Urgent',
    'Immediate',
    'Today',
    'Within a week',
    'When possible',
  ];
  return levels[num];
};

//   function to add line breaks to to array
export const insertBreak = (arr) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);
    if (index < array.length - 1) {
      result.push(<br key={index} />);
    }
    return result;
  }, []);
};
