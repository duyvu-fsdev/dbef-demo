import { ClickAwayListener, Tooltip, useTheme, Zoom } from '@mui/material';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoIcon } from '_/assets/Icon';
import { Button, SearchMovie } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import ModeSwitcher from '_/components/subUI/ModeSwitcher/ModeSwitcher';

import { useAuth } from '_/contexts/AuthContext';
import DataServerContextProvider from '_/contexts/DataServerContext';
import { selector } from '_/Hook/redux/selector';
import { scrollYSlice } from '_/Hook/redux/slices';
import { routes } from '_/pages/routes';
import UserPopper from '_/Popper/UserPopper/UserPopper';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const position = useSelector(selector.scrollY);
    const { currentUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            dispatch(
                scrollYSlice.actions.getScrollY({
                    state: window.scrollY,
                }),
            );
        };

        window.addEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let style;
    if (position <= 50) {
        style = {
            backgroundColor: 'transparent',
        };
    } else {
        if (theme.palette.mode === 'dark') {
            style = {
                backgroundColor: 'black',
            };
        } else {
            style = {
                backgroundColor: '#54c9ff',
            };
        }
    }

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <div
            className={cx('wrapper')}
            style={{
                '--background-color': `${style.backgroundColor}`,
            }}
        >
            <div className={cx('inner')}>
                <Button href={routes.home} className={cx('logo')}>
                    <LogoIcon />
                </Button>

                <div className={cx('Search')}>
                    <DataServerContextProvider>
                        {' '}
                        <SearchMovie />
                    </DataServerContextProvider>
                </div>

                <div className={cx('actions')}>
                    <div className={cx('actions-container')}>
                        <div className={cx('actions-content')}>
                            <div className={cx('log-action')}>
                                {!(currentUser !== null) && (
                                    <LoginBtn primary className={cx('login-btn')}>
                                        Log in
                                    </LoginBtn>
                                )}
                                <div className={cx('has-user')}>
                                    {currentUser !== null && (
                                        <>
                                            <ClickAwayListener onClickAway={handleTooltipClose}>
                                                <Tooltip
                                                    className={cx('tooltip')}
                                                    title={<UserPopper />}
                                                    arrow
                                                    TransitionComponent={Zoom}
                                                    PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                    onClose={handleTooltipClose}
                                                    open={open}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                >
                                                    <div onClick={handleTooltipOpen} className={cx('user-box')}>
                                                        <UserAvatar />
                                                    </div>
                                                </Tooltip>
                                            </ClickAwayListener>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModeSwitcher />
            </div>
        </div>
    );
}

export default memo(Header);
