import simpleReducer from './simple';
import complexReducer from './complex';
import no1000 from '../Middlewares/no1000';

export default function count2Reducer(state, action) {

    action = no1000(action);

    if (action.type < 2000) {
        return simpleReducer(state, action);
    } else {
        return complexReducer(state, action);
    }
    
}