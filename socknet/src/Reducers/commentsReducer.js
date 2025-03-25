import * as A from '../Constants/actions';

export default function commentsReducer(state, action) {

    let newState;

    console.log('CR--->', action.type);

    switch (action.type) {

        case A.LOAD_POST_COMMENTS:
            {
                newState = structuredClone(state);
                let postComments = newState.find(p => p.id === action.payload.postID);
                if (!postComments) {
                    postComments = {
                        id: action.payload.postID,
                        c: action.payload.comments,
                        show: true
                    };
                    newState.push(postComments);
                } else {
                    postComments.c = action.payload.comments;
                    postComments.show = true;
                }
                break;
            }
        case A.HIDE_POST_COMMENTS:
            {
                newState = structuredClone(state);
                const postComments = newState.find(p => p.id === action.payload.postID);
                if (!postComments) {
                    break;
                }
                postComments.show = false;
                break;
            }

        case A.SHOW_POST_COMMENTS:
            {
                newState = structuredClone(state);
                const postComments = newState.find(p => p.id === action.payload.postID);
                if (!postComments) {
                    break;
                }
                postComments.show = true;
                break;
            }

        case A.ADD_POST_COMMENT: 
        {


            break;
        }

        default: newState = state;
    }


    return newState;
}