import * as A from '../Constants/actions';

export default function postsReducer(state, action) {

    let newState;

    console.log('Posts reducer change state', action.type);

    switch (action.type) {

        case A.LOAD_POSTS_FROM_SERVER:
            if (null === state) {
                newState = action.payload;
            } else {
                newState = structuredClone(state); // gilioji objekto kopija (viska)
                newState.push(...action.payload);
            }
            break;

        case A.DOWN_VOTE_POST:
            {
                newState = structuredClone(state);
                console.log(newState);
                const up = new Set(action.payload.post.votes.l);
                const down = new Set(action.payload.post.votes.d);
                const id = action.payload.user.id;
                if (down.has(id)) {
                    down.delete(id);
                } else if (up.has(id)) {
                    up.delete(id);
                    down.add(id);
                } else {
                    down.add(id);
                }
                const post = newState.find(p => p.id === action.payload.post.id);
                post.votes.l = [...up];
                post.votes.d = [...down];
                break;
            }
            case A.UP_VOTE_POST:
                {
                    newState = structuredClone(state);
                    console.log(newState);
                    const up = new Set(action.payload.post.votes.l);
                    const down = new Set(action.payload.post.votes.d);
                    const id = action.payload.user.id;
                    if (up.has(id)) {
                        up.delete(id);
                    } else if (down.has(id)) {
                        down.delete(id);
                        up.add(id);
                    } else {
                        up.add(id);
                    }
                    const post = newState.find(p => p.id === action.payload.post.id);
                    post.votes.l = [...up];
                    post.votes.d = [...down];
                    break;
                }

        default: newState = state;
    }


    return newState;
}