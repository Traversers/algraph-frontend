import { useState, useEffect } from 'react';
import storageService from '../services/storageService';

const useGraphState = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [isPlacingNode, setIsPlacingNode] = useState(false);

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

    return{
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedNode,
        setSelectedNode,
        selectedEdge,
        setSelectedEdge,
        isPlacingNode,
        setIsPlacingNode
    }
};

export default useGraphState;