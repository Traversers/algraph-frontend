import { GRAPH_PREVIEW } from '../../constants/constants';
import './GraphPreview.css';
import { Card } from 'antd';

const GraphPreview = ({ key }) => {
  return (
    <div className="graph-preview">
      <Card
        title={GRAPH_PREVIEW}
        bordered={true}
        style={{ width: 200, height: 200, backgroundColor: 'lightpink' }}
      >
        {' '}
        graph need to be dispalyed here
      </Card>
    </div>
  );
};
export default GraphPreview;
