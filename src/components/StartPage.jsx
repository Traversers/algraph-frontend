import { FormatAlignJustify } from '@mui/icons-material';
import CreateGraphButton from './CreateGraph/CreateGraphButton';
import GraphPreviewGrid from './Graph/GraphPreviewGrid';

const StartPage = () => {
  return (
    <>
  <GraphPreviewGrid />
  <div className='createGraphButton' style={{top:'80%', left:'50%', position:'fixed', transform: 'translate(-50%, -50%)'}}>
    <CreateGraphButton/>
  </div>
  </>
);
};
export default StartPage;
