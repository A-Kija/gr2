import { useContext } from 'react';
import Data from '../../Contexts/Data';
import Auth from '../../Contexts/Auth';
import * as A from '../../Constants/actions';

export default function PostInList({ post }) {

    const { dispatchPosts, setPostUpdate } = useContext(Data);
    const { user } = useContext(Auth);

    const voteCounter = _ => {
        return post.votes.l.length - post.votes.d.length;
    }

    const userVote = type => {
        if (!user.id) {
            return null;
        }
        if ('up' === type) {
            return post.votes.l.includes(user.id) ? '#32cd32' : null;
        }
        return post.votes.d.includes(user.id) ? '#e01b1b' : null;
    }

    const upVote = _ => {
        if (!user.id) {
            return;
        }
        setPostUpdate({
            id: post.id,
            type: 'up_vote',
        });
        dispatchPosts({
            type: A.UP_VOTE_POST,
            payload: { user, post }
        });
    }

    const downVote = _ => {
        if (!user.id) {
            return;
        }
        setPostUpdate({
            id: post.id,
            type: 'down_vote',
        });
        dispatchPosts({
            type: A.DOWN_VOTE_POST,
            payload: { user, post }
        });
    }


    return (
        <li className="posts-list__post">
            <div className="posts-list__post__top">
                <div className="posts-list__post__top__avatar">
                    <img src={post.avatar} alt={post.name} />
                </div>
                <div className="posts-list__post__top__user">{post.name}</div>
                <div className="posts-list__post__top__date">{post.postDate.split('T')[0]}</div>
            </div>
            <div className="posts-list__post__image">
                <img src={post.mainImage} alt="post image" />
            </div>
            <div className="posts-list__post__content">
                {post.content}
            </div>
            <div className="posts-list__post__counter">
                <div className="up" onClick={upVote} style={{ color: userVote('up') }}>▲</div>
                <div className="count">{voteCounter()}</div>
                <div className="down" onClick={downVote} style={{ color: userVote('down') }}>▼</div>
            </div>
        </li>
    );
}