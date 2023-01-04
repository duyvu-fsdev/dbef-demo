import { Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { icon, SearchIcon } from '_/assets/Icon';
import AllMoviesDataContextProvider, { useAllData } from '_/contexts/AllMoviesDataContext';
import DataServerContextProvider, { useDataServer } from '_/contexts/DataServerContext';
import useDebounce from '_/Hook/useDebounce';
import { Wrapper as PopperWrapper } from '_/Popper/';
import removeVietnameseTones from '_/utils/removeVietnameseTones';
import styles from './SearchMovie.module.scss';
import SearchMovieItems from './SearchMovieItems';

const cx = classNames.bind(styles);

function SearchMovie() {
    const { handleClear, handleClick, handleChange, searchValue, handleFocus, showResult } = useDataServer();
    // const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const debounce = useDebounce(searchValue, 800);

    const { allMoviesData } = useAllData();

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        const valueS = removeVietnameseTones(debounce).toLowerCase();
        setSearchResult(
            allMoviesData.data.filter((data) => {
                const name = removeVietnameseTones(data?.name).toLowerCase();
                const origin_name = removeVietnameseTones(data?.origin_name).toLowerCase();
                return name.includes(valueS) || origin_name.includes(valueS);
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    const renderContent = () => {
        if (searchValue.length <= 0) return;
        return searchResult.map((item, index) => {
            return (
                <SearchMovieItems
                    key={index}
                    data={item}
                    handleClick={handleClick}
                    pathImage={allMoviesData.pathImage}
                    inputValue={searchValue}
                />
            );
        });
    };

    return (
        <DataServerContextProvider>
            <AllMoviesDataContextProvider>
                <div className={cx('wrapper')}>
                    <div className={cx('search')}>
                        <Tooltip
                            open={searchValue?.length > 0 && showResult && searchResult?.length > 0}
                            title={
                                <>
                                    {searchValue?.length > 0 && showResult && searchResult?.length > 0 && (
                                        <PopperWrapper className={cx('search-result-container')}>
                                            <h4 className={cx('search-result-title')}>Movie</h4>
                                            {renderContent()}
                                        </PopperWrapper>
                                    )}
                                </>
                            }
                        >
                            <div className={cx('search-container')}>
                                <div className={cx('search-content')}>
                                    <button className={cx('search-btn')}>
                                        <SearchIcon />
                                    </button>
                                    <input
                                        value={searchValue}
                                        placeholder="Enter movies name..."
                                        onChange={handleChange}
                                        spellCheck={false}
                                        onFocus={handleFocus}
                                        autoFocus
                                    />
                                    <div className={cx('icon')} onClick={handleClear}>
                                        {!!searchValue && <img className={cx('clear-btn')} src={icon.clear} alt="" />}
                                        {/* {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />} */}
                                    </div>
                                </div>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </AllMoviesDataContextProvider>
        </DataServerContextProvider>
    );
}

export default SearchMovie;
