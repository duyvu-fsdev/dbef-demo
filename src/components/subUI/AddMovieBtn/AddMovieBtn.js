import { collection, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { showLoadingSlice, showNotifSlice } from '_/Hook/redux/slices';
import { db } from '_/utils/Auth/firebase/firebaseConfig';
import Button from '../Button/Button';
import styles from '../Button/Button.module.scss';

const cx = classNames.bind(styles);

function AddMovieBtn({ className, children, dataDoc, collectionName, id, uid }) {
    const dispatch = useDispatch();

    const handleShowSnackbar = (state) => {
        dispatch(
            showNotifSlice.actions.showNotif({
                state: state,
            }),
        );
    };

    const handleHideSnackbar = () => {
        setTimeout(function () {
            dispatch(
                showNotifSlice.actions.showNotif({
                    state: { open: false, message: '', type: '' },
                }),
            );
        }, 2000);
    };

    const handleSetDocument = async (collectionName, data = {}, id, uid) => {
        dispatch(
            showLoadingSlice.actions.showLoading({
                state: true,
            }),
        );
        const collectionRef = collection(db, collectionName);
        const dbRef = doc(collectionRef, id);
        const docSnap = await getDoc(dbRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            if (data.uid?.includes(uid)) {
                dispatch(
                    showLoadingSlice.actions.showLoading({
                        state: false,
                    }),
                );
                handleShowSnackbar({
                    type: 'warning',
                    open: true,
                    message: 'This movie is already on the list !',
                });
                handleHideSnackbar();
                return;
            }

            updateDoc(dbRef, { uid: [...data.uid, uid] })
                .then(() => {
                    dispatch(
                        showLoadingSlice.actions.showLoading({
                            state: false,
                        }),
                    );
                    handleShowSnackbar({
                        type: 'success',
                        open: true,
                        message: `Movie has been added list watch later !`,
                    });
                    handleHideSnackbar();
                })
                .catch((error) => {
                    dispatch(
                        showLoadingSlice.actions.showLoading({
                            state: false,
                        }),
                    );
                    // //console.log('Unsuccessful operation, error' + error);
                    handleShowSnackbar({
                        type: 'error',
                        open: true,
                        message: 'Somethings is wrong, please check console.log !',
                    });
                    handleHideSnackbar();
                });

            return;
        }

        await setDoc(dbRef, data)
            .then(() => {
                dispatch(
                    showLoadingSlice.actions.showLoading({
                        state: false,
                    }),
                );
                handleShowSnackbar({
                    type: 'success',
                    open: true,
                    message: `Movie has been added list watch later !`,
                });
                handleHideSnackbar();
            })
            .catch((error) => {
                dispatch(
                    showLoadingSlice.actions.showLoading({
                        state: false,
                    }),
                );
                // //console.log('Unsuccessful operation, error' + error);
                handleShowSnackbar({
                    type: 'error',
                    open: true,
                    message: 'Somethings is wrong, please check console.log !',
                });
                handleHideSnackbar();
            });
    };

    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <Button text onClick={() => handleSetDocument(collectionName, dataDoc, id, uid)} className={classes}>
            {children}
        </Button>
    );
}

export default AddMovieBtn;
