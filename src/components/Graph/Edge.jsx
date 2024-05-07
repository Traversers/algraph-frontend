import React from 'react';

const Edge = ({ x1, y1, x2, y2, isSelected }) => {
  return (
    <svg
      style={
        {
          position: 'absolute',
          zIndex: isSelected ? 1 : -1,
          width: '100%',
          height: '100%'
        }
      }>
      <line
        x1={x1 + 10}
        y1={y1 + 10}
        x2={x2 + 10}
        y2={y2 + 10}
        stroke={isSelected ? 'red' : 'blue'}
        strokeWidth={isSelected ? '3' : '2'}
      />
    </svg>
  );
};

export default Edge;
