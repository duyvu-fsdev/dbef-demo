import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MovieItem, Pagination } from '_/components/subUI';
import { fetchMovies, getAllUrlParams } from '_/Hook/redux/slices';
import styles from './SubPages.module.scss';

const cx = classNames.bind(styles);

function ListUpdate() {
    const dispatch = useDispatch();
    const [value, setValue] = useState([]);
    const [pagination, setPagination] = useState({
        totalItems: 1,
        totalItemsPerPage: 1,
        currentPage: 1,
        totalPages: 1,
    });

    const [filter, setFilter] = useState({
        currentPage: parseInt(getAllUrlParams().page),
    });

    useEffect(() => {
        dispatch(fetchMovies(filter.currentPage))
            .then(unwrapResult)
            .then((result) => {
                const data = result.items;

                const value = data.map((data) => {
                    const { name, origin_name, poster_url, slug, thumb_url } = data;
                    const posterUrl = `${result.pathImage.replace('http:', 'https:')}${poster_url}`;
                    const thumbUrl = `${result.pathImage.replace('http:', 'https:')}${thumb_url}`;
                    const originName = origin_name;

                    const value = { name, originName, slug, posterUrl, thumbUrl };
                    return value;
                });

                setValue(value);
                setPagination(result.pagination);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handlePageChange = (newPage) => {
        setFilter({
            ...filter,
            currentPage: newPage,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('children-content')}>
                    <div className={cx('title')}>
                        <div>Phim mới cập nhật / trang {filter.currentPage}</div>
                    </div>
                    <MovieItem content={value} page={'ListUpdate'} />
                    <Pagination pagination={pagination} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}

export default ListUpdate;
