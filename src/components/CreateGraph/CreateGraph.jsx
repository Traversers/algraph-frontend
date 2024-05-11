import React, { useState, useEffect } from 'react';
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Flex, message } from 'antd';
import Graph from '../Graph/Graph';
import storageService from '../../services/storageService';
import CONSTANTS from '../../CONSTANTS/CONSTANTS';

const CreateGraph = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [isPlacingNode, setIsPlacingNode] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);

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

    const handleNodeClick = (clickedNode) => {
        let updatedNodes;

        if (!selectedNode) {
            updatedNodes = nodes.map((node) => ({
                ...node,
                isSelected: node === clickedNode ? !node.isSelected : false,
            }));

            setSelectedNode(clickedNode);
            setSelectedEdge(null);
        } else if (selectedNode === clickedNode) {
            updatedNodes = nodes.map((node) => ({
                ...node,
                isSelected: node === clickedNode ? false : node.isSelected,
            }));

            setSelectedNode(null);
            setSelectedEdge(null);
        } else if (selectedNode !== clickedNode) {
            addEdge(selectedNode, clickedNode);
            updatedNodes = nodes.map((node) => ({
                ...node,
                isSelected: false,
            }));
            setSelectedNode(null);
            setSelectedEdge(null);
        }

        if (selectedEdge) {
            const updatedEdges = edges.map((edge) => ({
                ...edge,
                isSelected: null,
            }));
            setEdges(updatedEdges);
            setSelectedEdge(null);
        }

        setNodes(updatedNodes);
    };

    const handleEdgeClick = (clickedEdge) => {
        const updatedEdges = edges.map((edge) => ({
            ...edge,
            isSelected: edge === clickedEdge ? !edge.isSelected : false,
        }));
        setEdges(updatedEdges);

        if (!selectedEdge || selectedEdge !== clickedEdge) {
            setSelectedEdge(clickedEdge);
            setSelectedNode(null);
        } else {
            setSelectedEdge(null);
            setSelectedNode(null);
        }
    };

    const handleStartPlacingNode = () => {
        setIsPlacingNode(true);
    };

    const handleNodePlacement = (event) => {
        if (!isPlacingNode) return;
        const boundingRect = event.target.getBoundingClientRect();

        const mouseX = event.clientX - boundingRect.left;
        const mouseY = event.clientY - boundingRect.top;

        const newNode = { x: mouseX, y: mouseY, isSelected: false, key: nodes.length + 1 };

        const nodeExists = nodes.some(node => node.x === newNode.x && node.y === newNode.y);

        if (nodeExists) {
            message.error(CONSTANTS.TEXTS.CREATE_GRAPH_ERRORS.NODE_EXISTS);
            return;
        }

        setNodes([...nodes, newNode]);
        setIsPlacingNode(false);
    }
    const addEdge = (sourceNode, targetNode) => {

        const sourceNodeId = sourceNode.key;
        const targetNodeId = targetNode.key;

        const edgeExists = edges.some(
            (edge) =>
                (edge.source.key === sourceNodeId && edge.target.key === targetNodeId) ||
                (edge.source.key === targetNodeId && edge.target.key === sourceNodeId)
        );

        if (edgeExists) {
            message.error(CONSTANTS.TEXTS.CREATE_GRAPH_ERRORS.EDGE_EXISTS);
            return;
        }
        if (sourceNodeId === targetNodeId) {
            return;
        }   

        const newEdge = { source: sourceNode, target: targetNode, isSelected: false, key: edges.length + 1 };
        setEdges([...edges, newEdge]);
        setSelectedEdge(newEdge);
    };


    const deleteNode = () => {
        if (!selectedNode) {
            message.error(CONSTANTS.TEXTS.CREATE_GRAPH_ERRORS.NO_NODE_SELECTED);
            return;
        }

        const updatedNodes = nodes.filter((node) => !(node.x === selectedNode.x && node.y === selectedNode.y));
        setNodes(updatedNodes);
        setSelectedNode(null);
    };

    const deleteEdge = () => {
        if (!selectedEdge) {
            message.error(CONSTANTS.TEXTS.CREATE_GRAPH_ERRORS.NO_EDGE_SELECTED);
            return;
        }

        const updatedEdges = edges.filter((edge) => {
            return !(edge.source === selectedEdge.source && edge.target === selectedEdge.target) &&
                !(edge.source === selectedEdge.target && edge.target === selectedEdge.source);
        });

        setEdges(updatedEdges);
        setSelectedEdge(null);
    };

    const clearAll = () => {
        setNodes([]);
        setEdges([]);
        setSelectedEdge(null);
        setSelectedNode(null);
    };

    const buttonsData = [
        { text: 'Add Node', icon: <PlusCircleFilled />, onClick: handleStartPlacingNode },
        { text: 'Delete Node', icon: <MinusCircleFilled />, onClick: deleteNode },
        { text: 'Delete Edge', icon: <MinusCircleFilled />, onClick: deleteEdge },
        { text: 'Clear All', icon: <DeleteFilled />, onClick: clearAll }
    ];

    return (
        <>
            <Flex gap="L" align="center" vertical>
                <Flex gap="small" wrap="wrap">
                    {buttonsData.map((button, index) => (
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
                    width: '500px',
                    height: '500px',
                    border: '1px solid black',
                    margin: '20px auto'
                }}
            >
                <Graph nodes={nodes} edges={edges} handleNodeClick={handleNodeClick} handleEdgeClick={handleEdgeClick} />
            </div>

        </>
    );
};

export default CreateGraph;

