import { useEffect, useReducer, useState } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import commentsReducer from '../Reducers/commentsReducer';

export default function useComments() {

    /*
        [
            {id: 5, c: [], show: true}
            {id: 14, c: [], show: true}
            {id: 57, c: [], show: true}
        ]
    */

    const [comments, dispatchComments] = useReducer(commentsReducer, []); // aprasytas steitas

    const [com, setCom] = useState(null);

    const revertSmiles = content => {
        C.smiles.forEach(s => {
            content = value.replace(s[1], s[0]);
        });
        return content;
    }

    useEffect(_ => {
        if (null === com) {
            return;
        }
        axios.post(C.SERVER_URL + 'comments/create/' + com.postID, { content: revertSmiles(com.content) }, { withCredentials: true })
        .then(res => {
            console.log(res.data)
        })
        .catch(error => {
            console.log(error);
        })

    }, [com]);


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


    return { comments, dispatchComments, getPostCommentsFromServer, setCom }

}