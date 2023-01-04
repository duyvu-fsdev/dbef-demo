import { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from '_/contexts/AuthContext';
import { useDocument } from '../utils/Auth/firebase/services';

const FireStoreContext = createContext({
    movieData: null,
    userData: null,
    clearUserData: () => {},
});

export const useFireStore = () => useContext(FireStoreContext);

function FireStoreContextProvider({ children }) {
    const { uid } = useAuth();
    const [movieData, setMovieData] = useState(null);
    const [userData, setUserData] = useState(null);

    // eslint-disable-next-line no-self-assign
    const userDocuments = useDocument('users', 'uid', '==', uid);
    const movieDocuments = useDocument('watch_later_list', 'uid', 'array-contains', uid);

    useEffect(() => {
        setMovieData(movieDocuments);
        if (!uid) setUserData();
        else setUserData(...userDocuments);
    }, [userDocuments, uid, movieDocuments]);

    const clearUserData = () => {
        setUserData();
    };

    const value = {
        userData,
        movieData,
        clearUserData,
    };

    return <FireStoreContext.Provider value={value}>{children}</FireStoreContext.Provider>;
}

export default FireStoreContextProvider;
