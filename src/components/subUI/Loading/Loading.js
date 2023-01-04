import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: 99999,
                opacity: 0.9,
                textAlign: 'center',
                color: '#fff',
                padding: ' 0 16px',
            }}
        >
            <div className={cx('lds-dual-ring')}></div>
            <Typography variant="h2">Please wait a moment. I'm in processing...</Typography>
        </Box>
    );
}

export default Loading;
