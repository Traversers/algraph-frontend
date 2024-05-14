import { Col, Row } from 'antd';
import GraphPreview from './GraphPreview';
import { TEXTS } from '../../constants/texts';
import './GraphPreviewGrid.css';

const GraphPreviewGrid = () => {
  return (
    <div className="centered-container">
      <Row className="graph-row">
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.DIRECTED_GRAPH} />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.CIRCLE_GRAPH} />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.DUG_GRAPH} />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.UNDIRECTED_GRAPH} />
        </Col>
      </Row>
      <Row className="graph-row">
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.WEIGHTED_GRAPH} />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview text={TEXTS.NEGATIVE_WEIGHTED_GRAPH} />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview />
        </Col>
        <Col className="graph-col" xs={24} xl={4}>
          <GraphPreview />
        </Col>
      </Row>
    </div>
  );
};
export default GraphPreviewGrid;
