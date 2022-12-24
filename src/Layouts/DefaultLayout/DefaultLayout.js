import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Content, Header, Sidebar } from '_/components/mainUI';
import SidebarRight from '_/components/mainUI/SidebarRight/SidebarRight';
// import SidebarRight from '_/components/mainUI/SidebarRight/SidebarRight';
import Modal from '_/components/subUI/Modal/Modal';
import { selector } from '_/Hook/redux/selector';
import { overlaySlice } from '_/Hook/redux/slices';
import UseSnackbar from '_/Hook/Toats/UseSnackbar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const showModal = useSelector(selector.showModal);
    const showNotif = useSelector(selector.showNotif);

    const { open, message, type, styleOveride } = showNotif;

    const dispatch = useDispatch();

    const overlay = useSelector(selector.setOverlay);

    const handleHideOverlay = () => {
        dispatch(
            overlaySlice.actions.setOverlay({
                state: false,
            }),
        );
    };

    return (
        <div className={cx('wrapper')}>
            {overlay && <div className={cx('overlay')} onClick={handleHideOverlay}></div>}
            <UseSnackbar
                message={message}
                open={open}
                placement="topCenter"
                type={type}
                styleOveride={{
                    ...styleOveride,
                    width: 'auto',
                    fontSize: '1.4rem',
                    marginTop: '5%',
                    alignItems: 'center',
                }}
            />
            {showModal && <Modal />}
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('inner')}>
                <Box
                    className={cx('sidebar-left')}
                    sx={{
                        display: { 0: 'none', 760: 'flex' },
                    }}
                >
                    {' '}
                    <Sidebar />
                </Box>

                <Box
                    sx={{
                        display: { 0: 'none', 1600: 'flex' },
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
