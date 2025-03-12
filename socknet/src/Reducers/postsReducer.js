import * as A from '../Constants/actions';

export default function postsReducer(state, action) {

    let newState;

    switch (action.type) {

        case A.LOAD_POSTS_FROM_SERVER:
            if (null === state) {
                newState = action.payload;
            } else {
                newState = structuredClone(state); // gilioji objekto kopija (viska)
                newState.push(...action.payload);
            }
            break;


        default: newState = state;
    }


    return newState;
}