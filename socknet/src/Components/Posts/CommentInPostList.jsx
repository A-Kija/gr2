export default function CommentInPostList({ comment }) {

    return (
        <div className="posts-list__post__comments__comment">
            <div className="posts-list__post__comments__comment__top">
                <span className="user">{comment.name}</span>
                <span className="date">{comment.created_at.split('T')[0]}</span>
            </div>
            <div className="posts-list__post__comments__comment__content">
                {comment.content}
            </div>
        </div>
    );
}