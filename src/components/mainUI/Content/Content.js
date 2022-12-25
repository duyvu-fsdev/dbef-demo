import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { memo } from 'react';

import Loading from '_/components/subUI/Loading/Loading';
import { useFireStore } from '_/contexts/FireStoreContext';
import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content({ children }) {
    const { allMoviesData } = useFireStore();
    return (
        <div className={cx('wrapper')}>
            <Box
                sx={{
                    padding: {
                        0: '0 1px',
                        760: '0 16px',
                        1360: '0 32px',
                    },
                }}
                className={cx('inner')}
            >
                {allMoviesData ? children : <Loading />}
                {/* {children} */}
            </Box>
        </div>
    );
}

export default memo(Content);
