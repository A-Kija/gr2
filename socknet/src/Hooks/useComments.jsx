import { useReducer } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import commentsReducer from '../Reducers/commentsReducer';

export default function useComments() {

    /*
        [
            {id: 5, c: []}
            {id: 14, c: []}
            {id: 57, c: []}
        ]
    */

    const [comments, dispatchComments] = useReducer(commentsReducer, []); // aprasytas steitas


    const getPostCommentsFromServer = postID => {
        axios.get(C.SERVER_URL + 'comments/for-post/' + postID, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchComments({
                    type: A.LOAD_POST_COMMENTS,
                    payload: {
                        postID,
                        comments: res.data.c
                    }
                });
            })
            .catch(error => {
                console.log(error);
            })
    }


    return { comments, dispatchComments, getPostCommentsFromServer }

}