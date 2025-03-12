import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import postsReducer from '../Reducers/postsReducer';

export default function usePosts() {

    const [posts, dispatchPosts] = useReducer(postsReducer, null); // aprasytas steitas

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'posts/load-posts/2')
            .then(res => {
                console.log(res.data.db); // is serverio gauti users duomenys
                // action yra OBJEKTAS dispatch viduje
                dispatchPosts({
                    type: A.LOAD_POSTS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });
    }, []);



    return { posts, dispatchPosts }
}