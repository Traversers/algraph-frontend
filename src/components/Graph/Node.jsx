import React from 'react';

const Node = ({ x, y, isSelected, onClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isSelected ? 'red' : 'lightgreen',
        left: `${x}px`,
        top: `${y}px`,
        cursor: 'pointer'
      }}
      onClick={onClick}
    ></div>
  );
};

export default Node;
