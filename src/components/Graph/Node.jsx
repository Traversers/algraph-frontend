import React from 'react';

const Node = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'lightgreen',
        left: `${x}px`,
        top: `${y}px`
      }}
    ></div>
  );
};

export default Node;
