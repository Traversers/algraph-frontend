import { message } from 'antd';
import { CREATE_GRAPH_ERRORS } from '../constants/constants';
import GraphService from '../services/GraphService';

const useGraphActions = (state) => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedNode,
        setSelectedNode,
        selectedEdge,
        setSelectedEdge,
        isPlacingNode,
        setIsPlacingNode,
    } = state;

    const handleStartPlacingNode = () => {
        setIsPlacingNode(true);
    };

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

    const edgeExists = (edges, node1Id, node2Id) => {
        return edges.some(({ source, target }) => {
            const { key: sourceKey } = source;
            const { key: targetKey } = target;
            return (
                (sourceKey === node1Id && targetKey === node2Id) ||
                (sourceKey === node2Id && targetKey === node1Id)
            );
        });
    };

    const addEdge = (sourceNode, targetNode) => {

        const sourceNodeId = sourceNode.key;
        const targetNodeId = targetNode.key;
        const exists = edgeExists(edges, sourceNodeId, targetNodeId);

        if (exists) {
            message.error(CREATE_GRAPH_ERRORS.EDGE_EXISTS);
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
            message.error(CREATE_GRAPH_ERRORS.NO_NODE_SELECTED);
            return;
        }

        const updatedNodes = nodes.filter((node) => !(node.x === selectedNode.x && node.y === selectedNode.y));
        setNodes(updatedNodes);
        setSelectedNode(null);
    };

    const filterSelectedEdge = (edges, selectedEdge) => {
        return edges.filter(edge => {
            const { source: edgeSource, target: edgeTarget } = edge;
            const { source: selectedEdgeSource, target: selectedEdgeTarget } = selectedEdge;

            return !(edgeSource === selectedEdgeSource && edgeTarget === selectedEdgeTarget) &&
                !(edgeSource === selectedEdgeTarget && edgeTarget === selectedEdgeSource);
        });
    };

    const deleteEdge = () => {
        if (!selectedEdge) {
            message.error(CREATE_GRAPH_ERRORS.NO_EDGE_SELECTED);
            return;
        }

        const updatedEdges = filterSelectedEdge(edges, selectedEdge);

        setEdges(updatedEdges);
        setSelectedEdge(null);
    };
    const clearAll = () => {
        setNodes([]);
        setEdges([]);
        setSelectedEdge(null);
        setSelectedNode(null);
    };

    const handleNodePlacement = (event) => {
        if (!isPlacingNode) {
            return;
        };
        const boundingRect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - boundingRect.left;
        const mouseY = event.clientY - boundingRect.top;
        const newNode = { x: mouseX, y: mouseY, isSelected: false, key: nodes.length + 1 };
        const nodeExists = nodes.some(
            (node) => node.x === newNode.x && node.y === newNode.y
        );
        if (nodeExists) {
            message.error(CREATE_GRAPH_ERRORS.NODE_EXISTS);
            return;
        }
        setNodes([...nodes, newNode]);
        setIsPlacingNode(false);
        setSelectedEdge(null);
        const updatedEdges = edges.map((edge) => ({
            ...edge,
            isSelected: false,
        }));
        setEdges(updatedEdges);
    };

    const saveGraphToDB = async () => {
        const edgeData = edges.map(edge => ({
            src: edge.source.key,
            dest: edge.target.key
        }));

        const nodeData = nodes.map(node => ({
            id: node.key,
            location: { x: node.x, y: node.y }
        }));

        const graphData = {
            vertices: nodeData,
            edges: edgeData
        };
        const response = await GraphService.createGraph({ graphData });
        console.log(response);
    };

    const getGraphFromDB = async (id) => {
        const response = await GraphService.getGraph(id);

        const { vertices, edges } = response;
        const nodes = vertices.map(vertex => ({
            ...vertex.location,
            key: vertex.id,
            isSelected: false
        }));
        const graphEdges = edges.map(edge => {
            const source = nodes.find(node => node.key === edge.src);
            const target = nodes.find(node => node.key === edge.dest);
            return { source, target, isSelected: false, key: edges.indexOf(edge) + 1 };
        });
        setNodes(nodes);
        setEdges(graphEdges);
    };

    const runAlgo = async (graphId, algoName = 'BFS', src = '1') => {
        const response = await GraphService.runAlgorithm(graphId, algoName, src);
        console.log(response);
    };

    return {
        handleStartPlacingNode,
        handleNodeClick,
        handleEdgeClick,
        addEdge,
        deleteNode,
        deleteEdge,
        clearAll,
        handleNodePlacement,
        saveGraphToDB,
        getGraphFromDB,
        runAlgo,
    };
};

export default useGraphActions;
