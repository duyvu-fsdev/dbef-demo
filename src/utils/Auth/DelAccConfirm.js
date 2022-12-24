import { collection, deleteDoc, doc } from '@firebase/firestore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFireStore } from '../../contexts/FireStoreContext';
import { db } from './firebase/firebaseConfig';

export default function AlertDialog() {
    const [id, setId] = useState();
    const [open, setOpen] = useState(false);
    const { deleteAccont } = useAuth();
    const { userData, movieData } = useFireStore();
    useEffect(() => {
        if (!userData) return;
        if (userData.length === 0) return;
        setId(userData.id);
    }, [userData]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        if (movieData.length !== 0) {
            // eslint-disable-next-line array-callback-return
            await movieData.map((item) => {
                (async () => {
                    const collectionRef = collection(db, 'watch_later_list');
                    const dbRef = doc(collectionRef, item.id);
                    await deleteDoc(dbRef).then(() => {});
                })();
            });

            (async () => {
                const collectionRef = collection(db, 'users');
                const dbRef = doc(collectionRef, id);
                await deleteDoc(dbRef).then(() => {
                    deleteAccont();
                    // eslint-disable-next-line no-restricted-globals
                    location.replace(window.location);
                });
            })();
            return;
        }
        (async () => {
            const collectionRef = collection(db, 'users');
            const dbRef = doc(collectionRef, id);
            await deleteDoc(dbRef).then(() => {
                deleteAccont();
                // eslint-disable-next-line no-restricted-globals
                location.replace(window.location);
            });
        })();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Delete the account ?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All data about you will be permanently deleted. Do you want to continue deleting?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
