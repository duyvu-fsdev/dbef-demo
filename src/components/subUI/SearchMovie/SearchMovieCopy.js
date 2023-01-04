import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { MyTooltip } from '_/components/CustomComponents/CustomComponents';

import { useAllData } from '_/contexts/AllMoviesDataContext';
import { useDataServer } from '_/contexts/DataServerContext';
import useDebounce from '_/Hook/useDebounce';
import { Wrapper as PopperWrapper } from '_/Popper/';
import removeVietnameseTones from '_/utils/removeVietnameseTones';
import styles from './SearchMovie.module.scss';
import SearchMovieItems from './SearchMovieItems';

const cx = classNames.bind(styles);

function SearchMovieCopy() {
    const { handleClear, handleClick, handleChange, searchValue, handleFocus, showResult } = useDataServer();
    // const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState({ dataFilter: [], pathImage: '' });

    const debounce = useDebounce(searchValue, 800);

    const { allMoviesData } = useAllData();

    useEffect(() => {
        if (!debounce.trim() || !allMoviesData) {
            setSearchResult([]);
            return;
        }
        const { data, pathImage } = allMoviesData;
        const valueS = removeVietnameseTones(debounce).toLowerCase();
        setSearchResult(() => {
            const dataFilter = data.filter((data) => {
                const name = removeVietnameseTones(data.name).toLowerCase();
                const originName = removeVietnameseTones(data.originName).toLowerCase();
                return name.includes(valueS) || originName.includes(valueS);
            });

            return { dataFilter, pathImage };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    const { dataFilter, pathImage } = searchResult;
    const renderContent = () => {
        if (searchValue.length <= 0) return;
        return dataFilter.map((item, index) => {
            return (
                <SearchMovieItems
                    key={index}
                    data={item}
                    handleClick={handleClick}
                    pathImage={pathImage}
                    inputValue={searchValue}
                />
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <MyTooltip
                    sx={{
                        padding: 0,
                    }}
                    open={searchValue?.length > 0 && showResult && dataFilter?.length > 0}
                    title={
                        <>
                            {searchValue?.length > 0 && showResult && dataFilter?.length > 0 && (
                                <PopperWrapper className={cx('search-result-container')}>
                                    <h4 className={cx('search-result-title')}>Movie</h4>
                                    <Box sx={{ maxHeight: '70vh', overflow: 'scroll' }}> {renderContent()}</Box>
                                </PopperWrapper>
                            )}
                        </>
                    }
                >
                    <Paper
                        sx={{
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            width: 320,
                            borderRadius: '6px',
                            boxShadow: 'none',
                        }}
                    >
                        <IconButton type="button">
                            <SearchIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                        <InputBase
                            autoComplete="false"
                            id="search"
                            sx={{ ml: 1, flex: 1 }}
                            value={searchValue}
                            placeholder="Enter movies name..."
                            onChange={handleChange}
                            spellCheck={false}
                            onFocus={handleFocus}
                        />
                        {!!searchValue && (
                            <IconButton onClick={handleClear} type="button">
                                <ClearIcon sx={{ fontSize: '2rem' }} />
                            </IconButton>
                        )}
                    </Paper>
                </MyTooltip>
            </div>
        </div>
    );
}

export default SearchMovieCopy;
