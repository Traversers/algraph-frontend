import React from 'react';

const Node = ({ node, handleNodeClick }) => {
    const handleNodeClickInternal = () => {
        handleNodeClick(node);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: node.x - 5,
                top: node.y - 5,
                width: 15,
                height: 15,
                backgroundColor: node.isSelected ? 'red' : 'blue',
                borderRadius: '50%',
                cursor: 'pointer',
            }}
            onClick={handleNodeClickInternal}
        />
    );
};

export default Node;
