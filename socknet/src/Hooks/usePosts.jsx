import { useReducer, useEffect, useState } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import postsReducer from '../Reducers/postsReducer';

export default function usePosts() {

    const [posts, dispatchPosts] = useReducer(postsReducer, null); // aprasytas steitas

    const [postUpdate, setPostUpdate] = useState(null);

    const [storePost, setStorePost] = useState(null);

    console.log('usePosts', 'user:', posts?.length);

    useEffect(_ => {

        if (null === storePost) {
            return;
        }

        axios.post(C.SERVER_URL + 'posts/new', storePost, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            dispatchPosts({
                type: A.POST_UUID_TO_ID,
                payload: {
                    id: res.data.id,
                    uuid: res.data.uuid
                }
            });
        })
        .catch(error => {
            console.log(error);
        })

    }, [storePost]);


    useEffect(_ => {
        if (null === postUpdate) {
            return;
        }
        axios.post(C.SERVER_URL + 'posts/update/' + postUpdate.id, {
            type: postUpdate.type,
            payload: postUpdate.payload ?? null
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [postUpdate]);


    useEffect(_ => {
        console.log('usePosts UseEffect start - request to server');
        let s = 0;
        const timer = setInterval(_ => {
            s += 400;
            console.log('waiting posts ms...', s);
        }, 400);
        axios.get(C.SERVER_URL + 'posts/load-posts/1')
            .then(res => {
                clearTimeout(timer);
                // console.log(res.data.db); // is serverio gauti users duomenys
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



    return { posts, dispatchPosts, setPostUpdate, setStorePost }
}