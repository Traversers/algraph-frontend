import { colors } from '@mui/material';
import { Col, Row, Slider } from 'antd';
import GraphPreview from './GraphPreview';
import { TEXTS } from "../../constants/texts";
import "./GraphPreviewGrid.css";

const GraphPreviewGrid = () => {
    const rowStyle = { marginBottom: '16px' };
  return (
   <div className='centered-container'>
   <div className="graph-preview-grid-container">
    <Row style={rowStyle}>
    <Col xs={24} xl={4}>
     <GraphPreview text={TEXTS.DIRECTED_GRAPH}/>
    </Col>
    <Col xs={24} xl={4}>
     <GraphPreview text={TEXTS.CIRCLE_GRAPH}/>
    </Col>
    <Col xs={24} xl={4}>
        <GraphPreview text={TEXTS.DUG_GRAPH}/>
    </Col>
    <Col xs={24} xl={4}>
        <GraphPreview text={TEXTS.UNDIRECTED_GRAPH}/>
    </Col>
  </Row>
  <Row style={rowStyle}>
    <Col xs={24} xl={4}>
     <GraphPreview text={TEXTS.WEIGHTED_GRAPH}/>
    </Col>
    <Col xs={24} xl={4}>
     <GraphPreview text={TEXTS. NEGATIVE_WEIGHTED_GRAPH}/>
    </Col>
    <Col xs={24} xl={4}>
        <GraphPreview/>
    </Col>
    <Col xs={24} xl={4}>
        <GraphPreview />
    </Col>
  </Row>
</div>
</div>
  
  
  );
}
export default GraphPreviewGrid;