import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getAdditionalUserInfo } from 'firebase/auth';
import { db } from './firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';

function addDocument(user, fullName) {
    const details = getAdditionalUserInfo(user);

    if (details.isNewUser) {
        const dbRef = collection(db, 'users');
        const { displayName, email, photoURL, uid, phoneNumber, emailVerified } = user.user;
        const dataDoc = {
            displayName: displayName || fullName,
            email,
            photoURL,
            uid,
            phoneNumber,
            emailVerified,
            gender: null,
            birthYear: null,
        };

        console.log({ details, user, dataDoc, dbRef });

        addDoc(dbRef, dataDoc)
            .then((docRef) => {
                const ref = doc(db, 'users', docRef.id);
                const updateDataDoc = {
                    id: docRef.id,
                    createdAt: serverTimestamp(),
                };
                updateDoc(ref, updateDataDoc);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default addDocument;
