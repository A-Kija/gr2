export default function count2Reducer(state, action) {

    let newState;

    switch (action.type) {
        case 'plus 1':
            newState = state + 1;
            break;
        case '- 1':
            newState = state - 1;
            break;
        case 'plus 5':
            newState = state + 5;
            break;
        default:
            newState = state;
    }
        
    
    return newState;
}