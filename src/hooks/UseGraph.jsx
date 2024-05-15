import useGraphState from './UseGraphState';
import useGraphActions from './UseGraphActions';

const useGraph = () => {
    const state = useGraphState();
    const actions = useGraphActions(state);
    
    return { ...state, ...actions };
};
export default useGraph;