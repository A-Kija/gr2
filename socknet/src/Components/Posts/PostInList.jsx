export default function PostInList({ post }) {

    const voteCounter = _ => {
        return post.votes.l.length - post.votes.d.length;
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
                <div className="up">⇧</div>
                <div className="count">{voteCounter()}</div>
                <div className="down">⇩</div>
            </div>
        </li>
    );
}