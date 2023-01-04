import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { Suspense } from 'react';

import { Content, Header, Sidebar } from '_/components/mainUI';
import SidebarRight from '_/components/mainUI/SidebarRight/SidebarRight';
// import SidebarRight from '_/components/mainUI/SidebarRight/SidebarRight';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header search={false} />
            </div>
            <div className={cx('inner')}>
                <Box
                    className={cx('sidebar-left')}
                    sx={{
                        display: { 0: 'none', 720: 'flex' },
                    }}
                >
                    {' '}
                    <Sidebar />
                </Box>

                <Box
                    sx={{
                        display: { 0: 'none', 1440: 'flex' },
                    }}
                    className={cx('sidebar-right')}
                >
                    {' '}
                    <SidebarRight />
                </Box>

                <div className={cx('main-content')}>
                    {/* <Content>{children}</Content> */}

                    <Suspense fallback={<div>Loading...</div>}>
                        <Content>{children}</Content>
                    </Suspense>
                </div>
            </div>
            {/* <div className={cx('footer')}>
                <Footer />
            </div> */}
        </div>
    );
}

export default DefaultLayout;
