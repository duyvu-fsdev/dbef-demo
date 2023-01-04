import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';

import { Button } from '_/components/subUI';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function SlideItem(props) {
    const { slug, url, name } = props;
    const src = url === 'http://img.ophim1.cc/uploads/movies/';
    return (
        <div className={cx('slider')}>
            <Button to={`/phim&name=${slug}`} className={cx('banner-btn')}>
                {src ? (
                    <Box
                        sx={{ paddingTop: '25%', fontSize: '6rem', textAlign: 'center', color: '#fff' }}
                        className={cx('banner-text')}
                    >
                        <Typography variant="h4" sx={{ display: 'block', overflowWrap: 'break-word' }}>
                            {name}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{ display: 'block', overflowWrap: 'break-word', marginTop: '10px' }}
                        >
                            Poster is updating
                        </Typography>
                    </Box>
                ) : (
                    <img className={cx('banner-img')} src={url} alt="Loading" />
                )}
                {/* <div className={cx('border')}></div> */}
            </Button>
        </div>
    );
}

export default SlideItem;
