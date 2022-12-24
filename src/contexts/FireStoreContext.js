import { unwrapResult } from '@reduxjs/toolkit';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchMovies } from '_/Hook/redux/slices';
import { useAuth } from '_/contexts/AuthContext';
import { useDocument } from '../utils/Auth/firebase/services';

const FireStoreContext = createContext({
    movieData: null,
    userData: null,
    allMoviesData: null,
});

export const useFireStore = () => useContext(FireStoreContext);

function FireStoreContextProvider({ children }) {
    const dispatch = useDispatch();
    const { uid } = useAuth();
    const [movieData, setMovieData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allMoviesData, setAllMoviesData] = useState(null);

    // eslint-disable-next-line no-self-assign
    const userDocuments = useDocument('users', 'uid', '==', uid);
    const movieDocuments = useDocument('watch_later_list', 'uid', 'array-contains', uid);

    useEffect(() => {
        setMovieData(movieDocuments);
        setUserData(...userDocuments);
    }, [userDocuments, uid, movieDocuments]);

    useEffect(() => {
        dispatch(fetchMovies())
            .then(unwrapResult)
            .then((result) => {
                let dataReturn = [];
                for (let i = 1; i <= result.pagination.totalPages; i++) {
                    dispatch(fetchMovies(i))
                        .then(unwrapResult)
                        .then((res) => {
                            if (!res) return;
                            return res.items;
                        })
                        .then((res) => {
                            if (!res) return;
                            res.map((data) => {
                                const { name, origin_name, poster_url, slug, thumb_url, year, _id } = data;
                                return dataReturn.push({ name, origin_name, poster_url, slug, thumb_url, year, _id });
                            });
                        });
                }

                setAllMoviesData({
                    data: dataReturn,
                    pathImage: result.pathImage,
                });
            })
            .catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        allMoviesData,
        userData,
        movieData,
    };

    return <FireStoreContext.Provider value={value}>{children}</FireStoreContext.Provider>;
}

export default FireStoreContextProvider;
