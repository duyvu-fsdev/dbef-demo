import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selector } from '_/Hook/redux/selector';
import { overlaySlice } from '_/Hook/redux/slices';

const DataServerContext = createContext({
    searchValue: '',
    fullData: {},
    handleClick: () => {},
    handleFocus: () => {},
    handleClear: () => {},
    handleChange: () => {},
});

export const useDataServer = () => useContext(DataServerContext);

function DataServerContextProvider({ children }) {
    const overlay = useSelector(selector.setOverlay);

    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!debounce.trim() && !showResult) {
    //         return;
    //     }

    //     dispatch(fetchMovies())
    //         .then(unwrapResult)
    //         .then((result) => {
    //             let dataReturn = { data: [], pathImage: result.pathImage };
    //             for (let i = 1; i <= result?.pagination?.totalPages; i++) {
    //                 dispatch(fetchMovies(i))
    //                     .then(unwrapResult)
    //                     .then((res) => res?.items)
    //                     .then((res) => {
    //                         res?.map((data) => {
    //                             const { name, origin_name, thumb_url, slug } = data;
    //                             return dataReturn.data.push({ name, origin_name, thumb_url, slug });
    //                         });
    //                     });
    //             }

    //             setFullData(dataReturn);
    //         })

    //         .catch((error) => console.log(error));

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounce, showResult]);

    const handleFocus = () => {
        setShowResult(true);
        dispatch(
            overlaySlice.actions.setOverlay({
                state: true,
            }),
        );
    };

    useEffect(() => {
        overlay ? setShowResult(true) : setShowResult(false);
    }, [overlay]);

    const handleClick = () => {
        setSearchValue('');
        dispatch(
            overlaySlice.actions.setOverlay({
                state: false,
            }),
        );
    };

    const handleClear = () => {
        setSearchValue('');
        // eslint-disable-next-line no-restricted-globals
        // location.replace(window.location);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value.replace(/ + /g, ' ');
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        } else {
            setSearchValue('');
        }
        if (!searchValue.trim()) {
            setSearchValue('');
        }
    };

    const value = { handleChange, handleClick, handleClear, handleFocus, searchValue, showResult };

    return <DataServerContext.Provider value={value}>{children}</DataServerContext.Provider>;
}

export default DataServerContextProvider;
