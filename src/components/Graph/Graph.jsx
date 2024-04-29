import React from 'react';
import Node from './Node';
import Edge from './Edge';

const ListItem = ({ items, renderItem }) => {
  return items.map((item, index) => renderItem(item, index));
};

const Graph = ({ nodes, edges }) => {
  const renderNode = (node, index) => (
    <Node
      key={index}
      x={node.x}
      y={node.y}
    />
  );

  const renderEdge = (edge, index) => (
    <Edge
      key={index}
      x1={edge.source.x}
      y1={edge.source.y}
      x2={edge.target.x}
      y2={edge.target.y}
    />
  );

  return (
    <>
      <ListItem items={nodes} renderItem={renderNode} />
      <ListItem items={edges} renderItem={renderEdge} />
    </>
  );
};

export default Graph;
