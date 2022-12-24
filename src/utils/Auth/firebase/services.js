import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '_/utils/Auth/firebase/firebaseConfig';

let dbRef = null;

export const AddDocument = async (collectionName, dataAdd = {}) => {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, dataAdd)
        .then(() => {
            console.log('data added successfully');
        })
        .catch((error) => {
            console.log('Unsuccessful operation, error' + error);
        });
};

export const SetDocument = async (collectionName, data = {}, id) => {
    const collectionRef = collection(db, collectionName);
    dbRef = doc(collectionRef, id);
    const docSnap = await getDoc(dbRef);
    if (docSnap.exists()) {
        console.log('Document does not exits !');

        return;
    }
    await setDoc(dbRef, data)
        .then(() => {
            console.log('data added successfully');
        })
        .catch((error) => {
            console.log('Unsuccessful operation, error' + error);
        });
};

export const DeleteDocument = async (collectionName, id) => {
    const collectionRef = collection(db, collectionName);
    dbRef = doc(collectionRef, id);

    const docSnap = await getDoc(dbRef);
    if (!docSnap.exists()) {
        console.log('Document does not exits !');
    }

    await deleteDoc(dbRef)
        .then(() => {
            console.log('data delete successfully');
        })
        .catch((error) => {
            console.log('Unsuccessful operation, error' + error);
        });
};

export const useDocument = (collectionName, fieldPath, operation, value) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!value) {
            return;
        }
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, where(fieldPath, operation, value), orderBy('createdAt'));
        const unsubcribe = onSnapshot(q, (docsSnap) => {
            var result = [];
            docsSnap.forEach((doc) => {
                result.push({ ...doc.data(), id: doc.id });
            });
            setData(result);
        });
        return unsubcribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return data;
};
