import { unwrapResult } from '@reduxjs/toolkit';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchMovies } from '_/Hook/redux/slices';

const AllMoviesDataContext = createContext({
    allMoviesData: null,
});

export const useAllData = () => useContext(AllMoviesDataContext);

function AllMoviesDataContextProvider({ children }) {
    const dispatch = useDispatch();
    const [allMoviesData, setAllMoviesData] = useState(null);

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
                                const {
                                    name,
                                    origin_name: originName,
                                    poster_url: posterUrl,
                                    slug,
                                    thumb_url: thumbUrl,
                                    year,
                                    _id: movieId,
                                } = data;
                                return dataReturn.push({ name, originName, posterUrl, slug, thumbUrl, year, movieId });
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
    };

    return <AllMoviesDataContext.Provider value={value}>{children}</AllMoviesDataContext.Provider>;
}

export default AllMoviesDataContextProvider;
