import { collection, getDocs } from '@firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from '_/contexts/AuthContext';
import { db } from '_/utils/Auth/firebase/firebaseConfig';
import { useDocument } from '../utils/Auth/firebase/services';

const FireStoreContext = createContext({
    fireStoreData: { watchLaterMovies: null, currentUserData: null, allUserData: null, allCommentsData: null },
    // clearUserData: () => {},
});

export const useFireStore = () => useContext(FireStoreContext);

function FireStoreContextProvider({ children }) {
    const { uid } = useAuth();
    const [fireStoreData, setFireStoreData] = useState({
        watchLaterMovies: null,
        currentUserData: null,
        allUserData: null,
    });

    // eslint-disable-next-line no-self-assign
    const currentUserDataDoc = useDocument('users', 'uid', '==', uid);
    const movieDataDoc = useDocument('watch_later_list', 'uid', 'array-contains', uid);

    useEffect(() => {
        const allUserData = [];
        (async () => {
            const colRef = collection(db, 'users');
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => allUserData.push(doc.data()));
        })();

        const allCommentsData = [];
        (async () => {
            const colRef = collection(db, 'comments');
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => allCommentsData.push(doc.data()));
        })();

        uid
            ? setFireStoreData({
                  currentUserData: { ...currentUserDataDoc[0] },
                  watchLaterMovies: movieDataDoc,
                  allUserData,
                  allCommentsData,
              })
            : setFireStoreData({
                  watchLaterMovies: null,
                  currentUserData: null,
                  allUserData: null,
              });
    }, [currentUserDataDoc, movieDataDoc, uid]);

    // const clearUserData = () => {
    //     setUserData();
    // };
    const value = {
        fireStoreData,
        // clearUserData,
    };

    return <FireStoreContext.Provider value={value}>{children}</FireStoreContext.Provider>;
}

export default FireStoreContextProvider;
