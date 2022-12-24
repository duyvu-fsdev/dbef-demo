import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from '@firebase/firestore';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { db } from '_/utils/Auth/firebase/firebaseConfig';
import { useAuth } from '_/contexts/AuthContext';
import LoginBtn from '../LoginBtn/LoginBtn';

import Comment from './Comment';
import styles from './comment.module.scss';
import CommentForm from './CommentForm';

const cx = classNames.bind(styles);

function Comments({ id }) {
    const [data, setData] = useState();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const rootComments = comments?.filter((data) => data.parentId === null);
    const getReplies = (id) => {
        const replies = comments?.filter((data) => data.parentId === id);
        return replies.reverse((a, b) => b - a);
    };

    useEffect(() => {
        if (!currentUser) return;

        const { uid, displayName, photoURL } = currentUser;

        setData({
            photoURL,
            uid,
            displayName,
            createdAt:
                new Date().getDate() +
                '-' +
                (new Date().getMonth() + 1) +
                '-' +
                new Date().getFullYear() +
                ' ' +
                new Date().getHours() +
                ':' +
                new Date().getMinutes() +
                ':' +
                new Date().getSeconds(),
        });
    }, [currentUser, id]);

    useEffect(() => {
        const collectionRef = collection(db, 'comments');
        const q = query(collectionRef, where('id', '==', id));
        const unsubcribe = onSnapshot(q, (docsSnap) => {
            let result = [];
            docsSnap.forEach((doc) => {
                const data = doc.data();
                result.push(data.comments);
            });
            setComments(result[0]?.reverse((a, b) => b - a));
        });

        return unsubcribe;
    }, [id]);

    const addComment = async (text, parentId = null) => {
        setActiveComment(null);
        const collectionRef = collection(db, 'comments');
        const dbRef = doc(collectionRef, id);
        const docSnap = await getDoc(dbRef);
        const dataDoc = {
            id,
            comments: [
                {
                    ...data,
                    id: uuidv4(),
                    content: text,
                    parentId,
                },
            ],
        };
        if (docSnap.exists()) {
            const data = docSnap.data();
            updateDoc(dbRef, { comments: [...data.comments, ...dataDoc.comments] });

            return;
        }
        await setDoc(dbRef, { ...dataDoc });
    };

    const updateComment = (text, commentId) => {
        const collectionRef = collection(db, 'comments');
        const dbRef = doc(collectionRef, id);

        const dataUpdate = comments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, content: text };
            }
            return comment;
        });

        setActiveComment(null);
        updateDoc(dbRef, { comments: [...dataUpdate.reverse((a, b) => b - a)] });
    };

    const deleteComment = (commentId, commentParentId) => {
        const collectionRef = collection(db, 'comments');
        const dbRef = doc(collectionRef, id);

        let dataUpdate;

        if (commentParentId) {
            dataUpdate = comments.filter((comment) => comment.id !== commentId);
        } else {
            dataUpdate = comments.filter((comment) => comment.parentId !== commentId && comment.id !== commentId);
        }

        setActiveComment(null);
        updateDoc(dbRef, { comments: [...dataUpdate.reverse((a, b) => b - a)] });
    };

    return (
        <div className={cx('comments-wrapper')}>
            <div className={cx('comments')}>
                <h3 className={cx('comments-title')}>Comments</h3>
                {currentUser ? (
                    <CommentForm submitLabel="Write" handleSubmit={addComment} />
                ) : (
                    <div className={cx('login-btn-container')}>
                        <LoginBtn className={cx('login-btn')}>Login to comment</LoginBtn>
                    </div>
                )}
                <div className={cx('comments-container')}>
                    {rootComments &&
                        rootComments.map((comments) => (
                            <Comment
                                key={comments.id}
                                comment={comments}
                                replies={getReplies(comments.id)}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                uid={data?.uid}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Comments;
