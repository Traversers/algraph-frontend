import { TEXTS } from '../../constants/texts';
import './GraphPreview.css';
import { Card } from 'antd';
const { Meta } = Card;
const GraphPreview = ({ text }) => {
  return (
    <div className="graph-preview">
      <Card
        hoverable
        title={text}
        bordered={false}
        className="card cardTitle"
        ellipsis={{ tooltip: true }}
      >
        graph need to be dispalyed here
      </Card>
    </div>
  );
};
export default GraphPreview;
