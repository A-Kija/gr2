import * as C from '../Constants/count2';

export default function count2Reducer(state, action) {

    let newState;

    switch (action.type) {
        case C.plusInput:
            newState = state + parseInt(action.payload);
            break;
        case C.multiInput:
            newState = state * parseInt(action.payload) / 2;
            break;
        default:
            newState = state;
    }
        
    
    return newState;
}