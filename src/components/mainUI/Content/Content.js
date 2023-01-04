import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import Loading from '_/components/subUI/Loading/Loading';
import { selector } from '_/Hook/redux/selector';

import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content({ children }) {
    const loading = useSelector(selector.showLoading);
    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <Box
                sx={{
                    padding: { 0: 0, 480: '0 1px', 640: '0 8px', 960: '0 16px' },
                }}
                className={cx('inner')}
            >
                {children}
            </Box>
        </div>
    );
}

export default memo(Content);
