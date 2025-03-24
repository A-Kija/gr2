import * as A from '../Constants/actions';

export default function commentsReducer(state, action) {

    let newState;

    switch (action.type) {

        case A.LOAD_POSTS_FROM_SERVER:
            {
                newState = structuredClone(state);
                let postComments = newState.find(p => p.id === action.payload.postID);
                if (!postComments) {
                    postComments = { id: action.payload.postID, c: action.payload.comments };
                    newState.push(postComments);
                } else {
                    postComments.c = action.payload.comments;
                }
                break;
            }

        default: newState = state;
    }


    return newState;
}