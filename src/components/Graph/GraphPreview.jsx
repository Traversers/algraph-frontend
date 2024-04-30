import { TEXTS } from "../../constants/texts";
import "./GraphPreview.css";
import { Layout } from "antd";

const GraphPreview = ({key}) => {
    return (
        <div className="graph-preview" >
            <div className="graph-preview__header">
            <h2>{TEXTS.GRAPH_PREVIEW}</h2>
            </div>
        </div>
    );
}
export default GraphPreview;