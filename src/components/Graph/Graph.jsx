import React from 'react';
import Node from './Node';
import Edge from './Edge';
import List from '../../common/List';

const Graph = ({ nodes, edges, handleNodeClick, handleEdgeClick }) => {
  const renderEdge = (edge, index) => (
    <Edge key={index} edge={edge} handleEdgeClick={handleEdgeClick} />
  );

  const renderNode = (node, index) => (
    <Node key={index} node={node} handleNodeClick={handleNodeClick} />
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <List items={edges} renderItem={renderEdge} />
      <List items={nodes} renderItem={renderNode} />
    </div>
  );
};

export default Graph;
