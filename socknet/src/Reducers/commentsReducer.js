import * as A from '../Constants/actions';
import { v4 } from 'uuid';

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
                    postComments.type = 'server';
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
                const postID = action.payload.postID;
                const userName = action.payload.userName;
                const userID = action.payload.userID;
                const content = action.payload.content;
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();
                const date = yyyy + '/' + mm + '/' + dd;
                newState = structuredClone(state);
                let postComments = newState.find(p => p.id === postID); // {id, c[]}

                const comment = {
                    id: v4(),
                    name: userName,
                    created_at: date,
                    content,
                    userID
                }

                if (!postComments) {
                    postComments = {
                        id: postID,
                        c: [comment],
                        show: true,
                        type: 'client'
                    };
                    newState.push(postComments);
                } else {
                    postComments.c.unshift(comment)
                }

                break;
            }

            case A.DELETE_POST_COMMENT: 
            {
                newState = structuredClone(state);
                const postComments = newState.find(p => p.id === action.payload.postID);
                if (!postComments) {
                    break;
                }
                postComments.c = postComments.c.filter(c => c.id !== action.payload.commentID);
                break;
            }

        default: newState = state;
    }


    return newState;
}