import { ClickAwayListener, Toolbar, Tooltip, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { LogoIcon } from '_/assets/Icon';
import { MyAppBar } from '_/components/CustomComponents/CustomComponents';
import { Button, SearchMovie } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import ModeSwitcher from '_/components/subUI/ModeSwitcher/ModeSwitcher';

import { useAuth } from '_/contexts/AuthContext';
import DataServerContextProvider from '_/contexts/DataServerContext';
import { routes } from '_/pages/routes';
import UserPopper from '_/Popper/UserPopper/UserPopper';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppBar>
                <Toolbar
                    sx={{
                        maxWidth: '1800px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        margin: ' 0 auto',
                        height: 'var(--header-height)',
                    }}
                >
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
                </Toolbar>
            </MyAppBar>
        </Box>
    );
}

export default memo(Header);
