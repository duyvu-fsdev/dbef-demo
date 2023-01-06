import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Banner, Button, MovieItem } from '_/components/subUI';
import { fetchMovies } from '_/Hook/redux/slices';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);

    useEffect(() => {
        const params = 1;

        dispatch(fetchMovies(params))
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

                setData(value);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('banner')}>
                <Banner content={{ data }} />
            </div>

            <div className={cx('content')}>
                <div className={cx('inner')}>
                    <div>
                        <div className={cx('children-content')}>
                            <div className={cx('title')}>
                                <div>Phim mới cập nhật</div>
                                <Button
                                    to={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/danh-sach/phim-moi-cap-nhat&page=1.html`}
                                    className={cx('see-more')}
                                    text
                                >
                                    Xem thêm
                                </Button>
                            </div>
                            <MovieItem content={data} page={'Home'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
