import React, { useState, useEffect } from 'react';
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Flex, message } from 'antd';
import Graph from '../Graph/Graph';
import storageService from '../../services/storageService';
import constants from '../../constants/constants';

const CreateGraph = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [isPlacingNode, setIsPlacingNode] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    
    useEffect(() => {
        const storedNodes = storageService.getData('graphNodes');
        const storedEdges = storageService.getData('graphEdges');

        if (storedNodes.length > 0 || storedEdges.length > 0) {
            setNodes(storedNodes);
            setEdges(storedEdges);
        }
    }, []);

    useEffect(() => {
        storageService.setData('graphNodes', nodes);
        storageService.setData('graphEdges', edges);
    }, [nodes, edges]);

    const handleNodeClick = (node) => {
        const updatedNodes = nodes.map((n) => ({
            ...n,
            isSelected: n === node ? true : false,
        }));
        setNodes(updatedNodes);
    
        if (!selectedNode) {
            setSelectedNode(node);
        } else {
            addEdge(selectedNode, node);
            setSelectedNode(null);
        }
    };

    const handleStartPlacingNode = () => {
        setIsPlacingNode(true);
    };

    const handleNodePlacement = (event) => {
        if(!isPlacingNode) return;
        const boundingRect = event.target.getBoundingClientRect();

        const mouseX = event.clientX - boundingRect.left;
        const mouseY = event.clientY - boundingRect.top;

        const newNode = { x: mouseX, y: mouseY };

        const nodeExists = nodes.some(node => node.x === newNode.x && node.y === newNode.y);

        if (nodeExists){
            message.error(constants.texts.CreateGraphErrors.nodeExists);
            return;
        }

        setNodes([...nodes, newNode]);
        setIsPlacingNode(false);
    }

    const addEdge = (sourceNode, targetNode) => {
        const newEdge = { source: sourceNode, target: targetNode };
    
        const edgeExists = edges.some(edge => (
            (edge.source === newEdge.source && edge.target === newEdge.target) ||
            (edge.source === newEdge.target && edge.target === newEdge.source)
        ));    
        if (edgeExists) {
            message.error("The edge already exists in the graph.");
            return;
        }
        
        setEdges([...edges, newEdge]);
    };

    const deleteNode = () => {
        if (nodes.length === 0) {
            message.error(constants.texts.CreateGraphErrors.noNodes);
            return;
        }
        const updatedNodes = [...nodes];
        updatedNodes.pop();
        setNodes(updatedNodes);
    };

    const deleteEdge = () => {
        if (edges.length === 0) {
            message.error(constants.texts.CreateGraphErrors.noEdges);
            return;
        }
        const updatedEdges = [...edges];
        updatedEdges.pop();
        setEdges(updatedEdges);
    };

    const clearAll = () => {
        setNodes([]);
        setEdges([]);
    };

    const buttons = [
        { text: 'Add Node', icon: <PlusCircleFilled />, onClick: handleStartPlacingNode },
        { text: 'Delete Node', icon: <MinusCircleFilled />, onClick: deleteNode },
        { text: 'Delete Edge', icon: <MinusCircleFilled />, onClick: deleteEdge },
        { text: 'Clear All', icon: <DeleteFilled />, onClick: clearAll }
    ];

    return (
        <>
            <Flex gap="L" align="center" vertical>
                <Flex gap="small" wrap="wrap">
                    {buttons.map((button, index) => (
                        <Button key={index} type="primary" size="large" icon={button.icon} onClick={button.onClick}>
                            {button.text}
                        </Button>
                    ))}
                </Flex>
            </Flex>

            <div
                onClick={handleNodePlacement}
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '80vh',
                    border: '1px solid black',
                    margin: '20px auto'
                }}
            >
                <Graph nodes={nodes} edges={edges} handleNodeClick={handleNodeClick} />
            </div>
        </>
    );
};

export default CreateGraph;
