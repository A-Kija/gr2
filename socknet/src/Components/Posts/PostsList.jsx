import { useContext } from 'react';
import Data from '../../Contexts/Data';
import PostInList from './PostInList';

export default function PostsList() {

    const { posts } = useContext(Data);

    if (null === posts) {
        return (
            <div className="bin bin-70">
                <h1>Siunčiami postai...</h1>
            </div>
        );
    }

        return (
            <div className="bin bin-30">
                <h1>Sock-Net</h1>
                <ul className="posts-list">
                    {
                        posts.map(p => <PostInList key={p.id} post={p} />)
                    }
                </ul>
            </div>
        );
}