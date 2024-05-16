import React from 'react';
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Flex, Card } from 'antd';
import Graph from '../Graph/Graph';
import useGraph from '../../hooks/UseGraph';
import { CREATE_GRAPH_BUTTONS_TEXTS } from '../../constants/constants';
import './CreateGraph.css';


const CreateGraph = () => {
    const {
        nodes,
        edges,
        handleStartPlacingNode,
        handleNodeClick,
        handleEdgeClick,
        deleteNode,
        deleteEdge,
        clearAll,
        handleNodePlacement,
        saveGraphToDB,
        getGraphFromDB,
        runAlgo,

    } = useGraph();

    const topButtonsData = [
        { text: CREATE_GRAPH_BUTTONS_TEXTS.ADD_NODE, icon: <PlusCircleFilled />, onClick: handleStartPlacingNode },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.DELETE_NODE, icon: <MinusCircleFilled />, onClick: deleteNode },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.DELETE_EDGE, icon: <MinusCircleFilled />, onClick: deleteEdge },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.CLEAR_ALL, icon: <DeleteFilled />, onClick: clearAll }
    ];

    const bottomButtoonsData = [
        { text: CREATE_GRAPH_BUTTONS_TEXTS.CREATE_GRAPH, onClick: saveGraphToDB },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.GET_GRAPH, onClick: () => getGraphFromDB('6645e1961d486f35dccbf30e') },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.RUN_ALGO, onClick: () => runAlgo('6644897ad518ea64f3b42280') },
    ];

    return (
        <>
            <Flex gap="L" align="center" vertical>
                <Flex gap="small" wrap="wrap">
                    {topButtonsData.map((button, index) => (
                        <Button key={index} type="primary" size="large" icon={button.icon} onClick={button.onClick}>
                            {button.text}
                        </Button>
                    ))}
                </Flex>
            </Flex>

            <div className='create-graph-container'>
                <Card bordered={false}>
                    <div
                        className="create-graph-preview"
                        onClick={handleNodePlacement}
                    >
                        <Graph nodes={nodes} edges={edges} handleNodeClick={handleNodeClick} handleEdgeClick={handleEdgeClick} />
                    </div>
                </Card>
            </div>

            <Flex gap="L" align="center" vertical>
                <Flex gap="small" wrap="wrap">
                    {bottomButtoonsData.map((button, index) => (
                        <Button key={index} type="primary" size="large" onClick={button.onClick}>
                            {button.text}
                        </Button>
                    ))}
                </Flex>
            </Flex>

        </>
    );
};

export default CreateGraph;
