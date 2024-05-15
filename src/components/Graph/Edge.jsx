import React from 'react';

const Edge = ({ edge, handleEdgeClick }) => {
  const { source, target } = edge;
  const length = Math.hypot(target.x - source.x, target.y - source.y);
  const angle = Math.atan2(target.y - source.y, target.x - source.x);

  const handleEdgeClickInternal = () => {
    handleEdgeClick(edge);
  };

  return (
    <div
      onClick={handleEdgeClickInternal}
    >
      <div
        style={{
          position: 'absolute',
          left: source.x,
          top: source.y,
          width: length-10,
          height: 2,
          backgroundColor: edge.isSelected ? 'red' : 'black',
          transformOrigin: 'left',
          transform: `rotate(${angle}rad)`,
          cursor: 'pointer',
        }}
      >
        {}
        <div
          style={{
            position: 'absolute',
            top: -5,
            left: length -10 ,
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: `7px solid ${edge.isSelected ? 'red' : 'black'}`,
          }}
        />
      </div>
    </div>
  );
};

export default Edge;
