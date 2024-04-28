import React from 'react';
import Node from './Node';
import Edge from './Edge';

const Graph = ({ nodes, edges }) => {
  const renderNodes = nodes.map((node, index) => (
    <Node
      key={index}
      x={node.x}
      y={node.y}
    />
  ));

  const renderEdges = edges.map((edge, index) => (
    <Edge
      key={index}
      x1={edge.source.x}
      y1={edge.source.y}
      x2={edge.target.x}
      y2={edge.target.y}
    />
  ));

  return (
    <div
      style={
        {
          position: 'relative',
          width: '500px',
          height: '500px',
          border: '1px solid black'
        }
      }>
      {renderNodes}
      {renderEdges}
    </div>
  );
};

export default Graph;

/*
SVG OPTION

import React, { useRef, useEffect } from 'react';

const Graph = ({ nodes, edges }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(({ source, target }) => {
      ctx.beginPath();
      ctx.moveTo(source.x + 10, source.y + 10);
      ctx.lineTo(target.x + 10, target.y + 10);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x + 10, y + 10, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightgreen';
      ctx.fill();
    });
  }, [nodes, edges]);

  return <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />;
};

export default Graph;
*/

