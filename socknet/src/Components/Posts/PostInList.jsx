import { useContext, useState } from 'react';
import Data from '../../Contexts/Data';
import Auth from '../../Contexts/Auth';
import * as A from '../../Constants/actions';
import * as C from '../../Constants/main';
import CommentInPostList from './CommentInPostList';

export default function PostInList({ post }) {

    const { dispatchPosts, setPostUpdate, getPostCommentsFromServer, comments, dispatchComments, setCom } = useContext(Data);
    const { user } = useContext(Auth);
    const [showComents, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

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

    const getComments = _ => {
        if (!showComents) {
            if (!comments.some(c => c.id === post.id && c.type === 'server')) {
                getPostCommentsFromServer(post.id);
            } else {
                dispatchComments({
                    type: A.SHOW_POST_COMMENTS,
                    payload: {
                        postID: post.id
                    }
                });
            }
            setShowComments(s => !s);
        } else {
            dispatchComments({
                type: A.HIDE_POST_COMMENTS,
                payload: {
                    postID: post.id
                }
            });
            setShowComments(s => !s);
        }

    }

    const handleComment = e => {
        let value = e.target.value;
        C.smiles.forEach(s => {
            value = value.replace(s[0], s[1]);
        });
        setComment(value);
    }

    const addNewComment = _ => {
        dispatchComments({
            type: A.ADD_POST_COMMENT,
            payload: {
                postID: post.id,
                userName: user.name,
                content: comment,
                userID: user.id
            }
        });
        setComment('');
        setCom({
            postID: post.id,
            content: comment
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

            {
                typeof post.id  === 'number' &&
            <>
                <div className="posts-list__post__bottom">
                    <div className="posts-list__post__bottom__counter">
                        <div className="up" onClick={upVote} style={{ color: userVote('up') }}>▲</div>
                        <div className="count">{voteCounter()}</div>
                        <div className="down" onClick={downVote} style={{ color: userVote('down') }}>▼</div>
                    </div>
                    <div className="posts-list__post__bottom__show-comments">
                        <span onClick={getComments}>{showComents ? 'Hide comments' : 'Show comments'}</span>
                    </div>
                </div>
                <div className="posts-list__post__write-comment">
                    <textarea onChange={handleComment} value={comment}></textarea>
                    <button type="button" onClick={addNewComment}>Send</button>
                </div>
                {
                    comments.some(p => p.id === post.id) &&
                    <div className="posts-list__post__comments">
                        {
                            comments.find(p => p.id === post.id).c
                                .map(comment => typeof comment.id === 'number' ? null : <CommentInPostList key={comment.id} comment={comment} post={post} />)
                        }
                    </div>
                }

                {
                    comments.some(p => p.id === post.id && p.show) &&
                    <div className="posts-list__post__comments">
                        {
                            comments.find(p => p.id === post.id).c
                                .map(comment => typeof comment.id === 'string' ? null : <CommentInPostList key={comment.id} comment={comment} post={post} />)
                        }
                    </div>
                }
            </>
                }

        </li>
    );
}