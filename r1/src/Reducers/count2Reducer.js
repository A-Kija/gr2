import simpleReducer from './simple';
import complexReducer from './complex';

export default function count2Reducer(state, action) {

    if (action.type < 2000) {
        return simpleReducer(state, action);
    } else {
        return complexReducer(state, action);
    }

    
}