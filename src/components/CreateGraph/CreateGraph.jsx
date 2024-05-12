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
    } = useGraph();

    const buttonsData = [
        { text: CREATE_GRAPH_BUTTONS_TEXTS.ADD_NODE, icon: <PlusCircleFilled />, onClick: handleStartPlacingNode },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.DELETE_NODE, icon: <MinusCircleFilled />, onClick: deleteNode },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.DELETE_EDGE, icon: <MinusCircleFilled />, onClick: deleteEdge },
        { text: CREATE_GRAPH_BUTTONS_TEXTS.CLEAR_ALL, icon: <DeleteFilled />, onClick: clearAll }
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

            <div style={{ width: '500px', margin: '20px auto' }}>
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
                    <Button type="primary" size="large">
                        Create Graph
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

export default CreateGraph;
