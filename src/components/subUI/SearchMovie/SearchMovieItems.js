import { Box, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import Button from '../Button/Button';

import styles from './SearchMovie.module.scss';

const cx = classNames.bind(styles);

function SearchMovieItem(props) {
    const { data, pathImage, handleClick } = props;
    const { slug, thumbUrl, name, originName } = data;
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                padding: '8px',
                position: 'relative',
                borderBottom: '1px solid #a1a1a1',
                ' &:hover': {
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.08)',
                },
            }}
            className={cx('search-item')}
        >
            <Button to={`/phim&name=${slug}`} className={cx('overlay')} onClick={handleClick}></Button>
            <div className={cx('movie-img-block')}>
                <img className={cx('movie-img')} src={`${pathImage}${thumbUrl}`} alt={name} />
            </div>
            <Box sx={{ overflow: 'auto', marginLeft: '12px' }} className={cx('content')}>
                <Typography variant="h5" fontWeight={500}>
                    {name}
                </Typography>
                <Typography variant="h6">({originName})</Typography>
            </Box>
        </Box>
    );
}

export default SearchMovieItem;
