import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Button } from '_/components/subUI';
import styles from './Auth.modelu.scss';

const cx = classNames.bind(styles);

export default function DelCmtConfirm({ children, deleteComment, commentId, commentPId, message }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={cx('del-cmt-wrapper')}>
            <Button onClick={handleClickOpen} className={cx('delete-btn')}>
                {children}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={cx('dialog')}>
                    <DialogContent sx={{ padding: '15px' }}>
                        <DialogContentText sx={{ color: 'inherit' }} id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ color: 'inherit', padding: '15px' }}>
                        <Button onClick={handleClose} outline className={cx('disagree-btn')}>
                            Disagree
                        </Button>
                        <Button
                            onClick={() => {
                                deleteComment(commentId, commentPId);
                            }}
                            outline
                            className={cx('agree-btn')}
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
