import * as C from '../Constants/count2';

export default function count2Reducer(state, action) {

    let newState;

    switch (action.type) {
        case C.plus1:
            newState = state + 1;
            break;
        case C.minus1:
            newState = state - 1;
            break;
        case C.plus5:
            newState = state + 5;
            break;
        default:
            newState = state;
    }
        
    
    return newState;
}