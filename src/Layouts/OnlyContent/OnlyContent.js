import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Content, Footer, Header, Sidebar } from '_/components/mainUI';
import { Button } from '_/components/subUI';
import { selector } from '_/Hook/redux/selector';
import { overlaySlice } from '_/Hook/redux/slices';

import styles from './OnlyContent.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [sideBar, setSideBar] = useState(true);
    const dispatch = useDispatch();

    const overlay = useSelector(selector.setOverlay);

    const handleHideOverlay = () => {
        dispatch(
            overlaySlice.actions.setOverlay({
                state: false,
            }),
        );
    };

    const handleHideSidebar = () => {
        setSideBar(false);
    };
    const handleShowSidebar = () => {
        setSideBar(true);
    };

    return (
        <div className={cx('wrapper')}>
            {overlay && <div className={cx('overlay')} onClick={handleHideOverlay}></div>}
            <div className={cx('header')}>
                <Header />
            </div>
            {sideBar && (
                <div className={cx('sidebar-left')}>
                    {' '}
                    <Sidebar />
                </div>
            )}
            <div className={cx('sidebar-sh')}>
                {sideBar && (
                    <Button
                        onClick={handleHideSidebar}
                        className={cx('hide-sidebar')}
                        leftIcon={<FontAwesomeIcon icon={faCircleArrowLeft} />}
                    ></Button>
                )}
                {!sideBar && (
                    <Button
                        onClick={handleShowSidebar}
                        className={cx('show-sidebar')}
                        leftIcon={<FontAwesomeIcon icon={faCircleArrowRight} />}
                    ></Button>
                )}
            </div>
            {sideBar && (
                <div className={cx('sidebar-right')}>
                    {' '}
                    <Sidebar />
                </div>
            )}
            <div className={cx('main-content')}>
                <Content>{children}</Content>
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default memo(DefaultLayout);
