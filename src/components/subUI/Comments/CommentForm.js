import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './comment.module.scss';

const cx = classNames.bind(styles);

function CommentForm(props) {
    const {
        handleSubmit,
        submitLabel,
        hasCancelButton = false,
        handleCancel,
        userCmt,
        content,
        isEditing = false,
        isReplying = false,
    } = props;
    const [text, setText] = useState('');

    const myRef = useRef(null);

    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event) => {
        const inputDiv = myRef.current;
        event.preventDefault();
        handleSubmit(text);
        inputDiv.innerHTML = '';
        setText('');
    };

    useEffect(() => {
        const inputDiv = myRef.current;

        if (isReplying && !isEditing) {
            const tagUser = '@' + userCmt + '&nbsp; : &nbsp';
            inputDiv.scrollIntoView({ block: 'center' });
            inputDiv.innerHTML = tagUser;
            inputDiv.focus();
            window.getSelection().selectAllChildren(inputDiv);
            window.getSelection().collapseToEnd();
            return;
        } else if (!isReplying && isEditing) {
            inputDiv.scrollIntoView({ block: 'center' });
            inputDiv.innerHTML = content;
            inputDiv.focus();
            window.getSelection().selectAllChildren(inputDiv);
            window.getSelection().collapseToEnd();
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div
                    ref={myRef}
                    className={cx('comment-form-textarea')}
                    contentEditable
                    onInput={(e) => {
                        setText(e.currentTarget.textContent);
                    }}
                />
                <button className={cx('comment-form-button')} disabled={isTextareaDisabled}>
                    {submitLabel}
                </button>
                {hasCancelButton && (
                    <button type="button" className={cx('comment-form-button')} onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default CommentForm;
