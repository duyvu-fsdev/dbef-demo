import CommentForm from './CommentForm';
import classNames from 'classnames/bind';

import styles from './comment.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DelCmtConfirm from '_/utils/Auth/DelCmtConfirm';

const cx = classNames.bind(styles);

function Replies(props) {
    const { comment, setActiveComment, activeComment, updateComment, deleteComment, parentId, uid } = props;
    const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === 'editing';

    const canDelete = uid === comment.uid;
    const canReply = Boolean(uid);
    const canEdit = uid === comment.uid;

    return (
        <div>
            <div key={comment.id} className={cx('comment')}>
                <div className={cx('comment-image-container')}>
                    {comment.photoURL ? (
                        <img className={cx('comment-image')} src={comment.photoURL} alt="" />
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
                                        id: parentId,
                                        type: 'replying',
                                        parentId,
                                        userCmt: comment.displayName,
                                        roll: true,
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
                </div>
            </div>
        </div>
    );
}

export default Replies;
