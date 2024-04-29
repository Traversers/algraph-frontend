import React, { useState, useEffect } from 'react';
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Flex, message } from 'antd';
import Graph from '../Graph/Graph';

const CreateGraph = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const storedNodes = JSON.parse(localStorage.getItem('graphNodes')) || [];
        const storedEdges = JSON.parse(localStorage.getItem('graphEdges')) || [];

        if (storedNodes.length > 0 && storedEdges.length > 0) {
            setNodes(storedNodes);
            setEdges(storedEdges);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('graphNodes', JSON.stringify(nodes));
        localStorage.setItem('graphEdges', JSON.stringify(edges));
    }, [nodes, edges]);

    const addNode = () => {
        const newNode = { x: Math.random() * 300, y: Math.random() * 300 };
        const nodeExists = nodes.some(node => node.x === newNode.x && node.y === newNode.y);
        if (nodeExists) {
            message.error('Node already exists.');
            return;
        }
        setNodes([...nodes, newNode]);
    };

    const addEdge = () => {
        if (nodes.length < 2) {
            message.error("Can't add edge. There must be at least two nodes.");
            return;
        }
        const randomSource = Math.floor(Math.random() * nodes.length);
        let randomTarget = Math.floor(Math.random() * nodes.length);
        while (randomTarget === randomSource) {
            randomTarget = Math.floor(Math.random() * nodes.length);
        }
        const newEdge = { source: nodes[randomSource], target: nodes[randomTarget] };
        const edgeExists = edges.some(edge => (
            (edge.source === newEdge.source && edge.target === newEdge.target) ||
            (edge.source === newEdge.target && edge.target === newEdge.source)
        ));
        if (edgeExists) {
            message.error('Edge already exists.');
            return;
        }
        setEdges([...edges, newEdge]);
    };

    const deleteNode = () => {
        if (nodes.length === 0) {
            message.error("There are no nodes to delete.");
            return;
        }
        const updatedNodes = [...nodes];
        updatedNodes.pop();
        setNodes(updatedNodes);
    };

    const deleteEdge = () => {
        if (edges.length === 0) {
            message.error("There are no edges to delete.");
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

    return (
        <>
            <Flex gap="L" align="center" vertical>
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" icon={<PlusCircleFilled />} size={'large'} onClick={addNode}>
                        Add Node
                    </Button>
                    <Button type="primary" icon={<PlusCircleFilled />} size={'large'} onClick={addEdge}>
                        Add Edge
                    </Button>
                    <Button type="primary" icon={<MinusCircleFilled />} size={'large'} onClick={deleteNode}>
                        Delete Node
                    </Button>
                    <Button type="primary" icon={<MinusCircleFilled />} size={'large'} onClick={deleteEdge}>
                        Delete Edge
                    </Button>
                    <Button type="primary" icon={<DeleteFilled />} size={'large'} onClick={clearAll}>
                        Clear All
                    </Button>
                </Flex>
            </Flex>

            <div
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '80vh', // This will be dynamically calculated
                    border: '1px solid black',
                    margin: '20px auto'
                }}
            >
                <Graph nodes={nodes} edges={edges} />
            </div>
        </>
    );
};

export default CreateGraph;
