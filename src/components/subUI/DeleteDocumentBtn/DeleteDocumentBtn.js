import { collection, deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { showLoadingSlice, showNotifSlice } from '_/Hook/redux/slices';
import { db } from '_/utils/Auth/firebase/firebaseConfig';
import Button from '../Button/Button';
import styles from '../Button/Button.module.scss';

const cx = classNames.bind(styles);

function DeleteDocumentBtn({ className, children, collectionName, id, uid }) {
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
    const handleDeleteDocument = async (collectionName, id, uid) => {
        dispatch(
            showLoadingSlice.actions.showLoading({
                state: true,
            }),
        );
        const collectionRef = collection(db, collectionName);
        const dbRef = doc(collectionRef, id);
        const docSnap = await getDoc(dbRef);

        const movies = docSnap.data();
        let dataUid = movies.uid;

        if (dataUid.length > 1) {
            const uidIndex = dataUid.findIndex((index) => {
                return index === uid;
            });
            dataUid.splice(uidIndex, 1);
            updateDoc(dbRef, { uid: dataUid })
                .then(() => {
                    dispatch(
                        showLoadingSlice.actions.showLoading({
                            state: false,
                        }),
                    );
                    handleShowSnackbar({
                        type: 'success',
                        open: true,
                        message: 'Movie has been deleted from list watch later !',
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

        await deleteDoc(dbRef)
            .then(() => {
                dispatch(
                    showLoadingSlice.actions.showLoading({
                        state: false,
                    }),
                );
                handleShowSnackbar({
                    type: 'success',
                    open: true,
                    message: 'Movie has been deleted from list watch later !',
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
        <Button onClick={() => handleDeleteDocument(collectionName, id, uid)} className={classes}>
            {children}
        </Button>
    );
}

export default DeleteDocumentBtn;
