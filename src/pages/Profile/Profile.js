import { collection, deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Button } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import { useAuth } from '_/contexts/AuthContext';
import { useFireStore } from '_/contexts/FireStoreContext';
import { changeFormSlice, showLoadingSlice, showModalSlice } from '_/Hook/redux/slices';
import { db } from '_/utils/Auth/firebase/firebaseConfig';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { uid, deleteAccont } = useAuth();
    const { userData, movieData } = useFireStore();

    useEffect(() => {
        const idTimeOut = setTimeout(() => {
            if (!uid) navigate('/');
            return;
        }, 500);

        return clearTimeout(idTimeOut);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    useEffect(() => {
        if (!userData) return;
        if (userData.length === 0) return;
        const { createdAt } = userData;
        setData({ ...userData, createdAt: new Date(createdAt.seconds * 1000).toString().slice(4, 15) });
    }, [userData]);

    // eslint-disable-next-line no-unused-vars
    const { birthYear, createdAt, displayName, email, emailVerified, id, phoneNumber, photoURL, gender } = data;

    const handleEdit = () => {
        dispatch(
            showModalSlice.actions.showModal({
                state: true,
            }),
        );
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { edit: true },
            }),
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        dispatch(
            showLoadingSlice.actions.showLoading({
                state: true,
            }),
        );
        if (movieData.length !== 0) {
            new Promise((myResolve, myReject) => {
                myResolve(); // when successful
                myReject(); // when error
            })
                .then((e) => {
                    // eslint-disable-next-line array-callback-return
                    movieData.map((item) => {
                        const collectionRef = collection(db, 'watch_later_list');
                        const dbRef = doc(collectionRef, item.id);
                        (async () => {
                            const docSnap = await getDoc(dbRef);
                            const movies = docSnap.data();
                            let dataUid = movies.uid;

                            if (dataUid.length !== 1) {
                                const uidIndex = dataUid.findIndex((index) => {
                                    return index === uid;
                                });
                                dataUid.splice(uidIndex, 1);
                                updateDoc(dbRef, { uid: dataUid });
                                return;
                            }

                            await deleteDoc(dbRef).then(() => {});
                        })();
                    });
                    return e;
                })
                .then((e) => {
                    setTimeout(() => {
                        const collectionRef = collection(db, 'users');
                        const dbRef = doc(collectionRef, id);
                        (async () => {
                            await deleteDoc(dbRef).then(() => {
                                deleteAccont();

                                dispatch(
                                    showLoadingSlice.actions.showLoading({
                                        state: false,
                                    }),
                                );
                                navigate('/');
                            });
                        })();
                    }, 5000);
                })
                .catch((error) => {});

            return;
        }
        (async () => {
            const collectionRef = collection(db, 'users');
            const dbRef = doc(collectionRef, id);
            await deleteDoc(dbRef).then(() => {
                deleteAccont();
                dispatch(
                    showLoadingSlice.actions.showLoading({
                        state: false,
                    }),
                );
                navigate('/');
            });
        })();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('settings-detail')}>
                    <Box
                        sx={{ fontSize: '1.6rem', lineHeight: '19px', margin: '12px', textAlign: 'left', opacity: 0.5 }}
                    >
                        Profile
                    </Box>
                    <div className={cx('form-group')}>
                        <div className={cx('account-box')}>
                            <div className={cx('portrait-container')}>
                                <UserAvatar
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        border: '1px solid currentColor',
                                        marginRight: '24px',
                                    }}
                                />

                                <div className={cx('portrait-right')}>
                                    <div className={cx('username')}>
                                        <span>{displayName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>Gender : </span>
                                <span className={cx('msg')}>{gender || 'Not Set'}</span>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>Birth : </span>
                                <span className={cx('msg')}>{birthYear || 'Not Set'}</span>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>Email :</span>
                                <span className={cx('msg')}>
                                    {email + ' ' + (emailVerified ? '(Activated)' : '(Not activated)')}
                                </span>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>Mobile number :</span>
                                <span className={cx('msg')}>{phoneNumber || 'Not Set'}</span>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>uid :</span>
                                <span className={cx('msg')}>{uid || 'Not Set'}</span>
                            </div>
                            <div className={cx('account')}>
                                <span className={cx('title')}>Time joined :</span>
                                <span className={cx('msg')}>{createdAt || 'Updating'}</span>
                            </div>

                            <div className={cx('acction')}>
                                <Button onClick={handleEdit} outline className={cx('edit-btn')}>
                                    Edit
                                </Button>
                                <div>
                                    <Button onClick={handleClickOpen} outline className={cx('delete-btn')}>
                                        DeleteAccont
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <div className={cx('dialog')}>
                                            <DialogTitle id="alert-dialog-title">{'Delete the account ?'}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText
                                                    sx={{ color: 'inherit' }}
                                                    id="alert-dialog-description"
                                                >
                                                    All data about you will be permanently deleted. Do you want to
                                                    continue ?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions sx={{ color: 'inherit' }}>
                                                <Button onClick={handleClose} outline className={cx('disagree-btn')}>
                                                    Disagree
                                                </Button>
                                                <Button onClick={handleDelete} outline className={cx('agree-btn')}>
                                                    Agree
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
