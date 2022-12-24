import classNames from 'classnames/bind';
import { memo } from 'react';
import Button from '../Button/Button';

import styles from './SearchMovie.module.scss';

const cx = classNames.bind(styles);

function SearchMovieItem(props) {
    const { data, pathImage, handleClick } = props;
    return (
        <div className={cx('search-item')}>
            <Button href={`/phim&name=${data.slug}`} className={cx('overlay')} onClick={handleClick}></Button>
            <div className={cx('movie-img-block')}>
                <img className={cx('movie-img')} src={`${pathImage}${data.thumb_url}`} alt={data.name} />
            </div>
            <div className={cx('content')}>
                <p className={cx('movie-name')}>{data.name}</p>
                <p className={cx('movie-origin-name')}>({data.origin_name})</p>
            </div>
        </div>
    );
}

export default memo(SearchMovieItem);
