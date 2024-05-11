import React from 'react';
import Node from './Node';
import Edge from './Edge';

const Graph = ({ nodes, edges, handleNodeClick, handleEdgeClick }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {edges.map((edge, index) => (
        <Edge key={index} edge={edge} handleEdgeClick={handleEdgeClick} />
      ))}
      {nodes.map((node, index) => (
        <Node key={index} node={node} handleNodeClick={handleNodeClick} />
      ))}
    </div>
  );
};

export default Graph;
