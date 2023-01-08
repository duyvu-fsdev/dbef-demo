import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import DelCmtConfirm from '_/utils/Auth/DelCmtConfirm';
import { useDocument } from '_/utils/Auth/firebase/services';
import styles from './comment.module.scss';
import CommentForm from './CommentForm';
import Replies from './Replies';

const cx = classNames.bind(styles);

function Comment(props) {
    const {
        comment,
        replies,
        setActiveComment,
        activeComment,
        updateComment,
        deleteComment,
        addComment,
        parentId = null,
        uid,
    } = props;
    const [src, setSrc] = useState('');
    const commentUser = useDocument('users', 'uid', '==', comment.uid);
    useEffect(() => {
        if (commentUser.length === 0) return;
        const { avatarUrl, photoURL } = commentUser[0];
        setSrc(avatarUrl ? avatarUrl : photoURL);
    }, [comment, commentUser]);

    const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === 'editing';
    const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === 'replying';
    // const fiveMinutes = 300000;
    // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete = uid === comment.uid;
    const canReply = Boolean(uid);
    const canEdit = uid === comment.uid;
    const replyId = parentId ? parentId : comment.id;

    return (
        <div>
            <div key={comment.id} className={cx('comment')}>
                <div className={cx('comment-image-container')}>
                    {src ? (
                        <img className={cx('comment-image')} src={src} alt="" />
                    ) : (
                        <AccountCircleIcon sx={{ width: '30px', height: '30px' }} />
                    )}
                </div>
                <div className={cx('comment-right-part')}>
                    <div className={cx('comment-content')}>
                        <div className={cx('comment-author')}>{comment.displayName}</div>
                    </div>
                    {!isEditing && <div className={cx('comment-text')}>{comment.content}</div>}
                    {isEditing && (
                        <CommentForm
                            userCmt={activeComment.userCmt}
                            submitLabel="Update"
                            hasCancelButton
                            initialText={comment.content}
                            handleSubmit={(text) => updateComment(text, comment.id)}
                            handleCancel={() => {
                                setActiveComment(null);
                            }}
                            content={activeComment.content}
                            isEditing={isEditing}
                        />
                    )}
                    <div className={cx('comment-actions')}>
                        {canReply && (
                            <div
                                className={cx('comment-action')}
                                onClick={() => {
                                    setActiveComment({
                                        id: comment.id,
                                        type: 'replying',
                                        userCmt: comment.displayName,
                                    });
                                }}
                            >
                                Reply
                            </div>
                        )}
                        {canEdit && (
                            <div
                                className={cx('comment-action')}
                                onClick={() => {
                                    setActiveComment({ id: comment.id, type: 'editing', content: comment.content });
                                }}
                            >
                                Edit
                            </div>
                        )}
                        {canDelete && (
                            <DelCmtConfirm
                                deleteComment={deleteComment}
                                commentId={comment.id}
                                commentPId={comment.parentId}
                                message="Are you sure you want to remove comment  ?"
                            >
                                Delete
                            </DelCmtConfirm>
                        )}
                        <div>{comment.createdAt}</div>
                    </div>

                    {replies.length > 0 && (
                        <div className={cx('replies')}>
                            {replies.map((reply) => (
                                <Replies
                                    key={reply.id}
                                    comment={reply}
                                    setActiveComment={setActiveComment}
                                    activeComment={activeComment}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                    addComment={addComment}
                                    parentId={comment.id}
                                    replies={[]}
                                    uid={uid}
                                />
                            ))}
                        </div>
                    )}
                    {isReplying && (
                        <div>
                            <CommentForm
                                hasCancelButton
                                isReplying={isReplying}
                                userCmt={activeComment.userCmt}
                                submitLabel="Reply"
                                handleSubmit={(text) => {
                                    addComment(text, replyId);
                                }}
                                handleCancel={() => {
                                    setActiveComment(null);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Comment;
