import React from 'react';

const Edge = ({ x1, y1, x2, y2 }) => {
  return (
    <svg
      style={
        {
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: '100%'
        }
      }>
      <line
        x1={x1 + 10}
        y1={y1 + 10}
        x2={x2 + 10}
        y2={y2 + 10}
        stroke="blue"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Edge;
