import { useTheme } from '@emotion/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ClickAwayListener, IconButton, Toolbar, Tooltip, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { LogoIcon } from '_/assets/Icon';
import { MyAppBar } from '_/components/CustomComponents/CustomComponents';
import { Button } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import SearchMovieCopy from '_/components/subUI/SearchMovie/SearchMovieCopy';
import { useAuth } from '_/contexts/AuthContext';
import DataServerContextProvider from '_/contexts/DataServerContext';
import { useThemMui } from '_/contexts/ThemeMuiContext';
import { routes } from '_/pages/routes';
import UserPopper from '_/Popper/UserPopper/UserPopper';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ search = true }) {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const { switchMode } = useThemMui();
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
                        maxWidth: '1920px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: ' 0 auto',
                        height: 'var(--header-height)',
                        padding: { 0: 0, 480: '0 1px', 640: '0 8px', 960: '0 16px' },
                    }}
                >
                    <Button href={routes.home} className={cx('logo')}>
                        <LogoIcon />
                    </Button>
                    {search && (
                        <div className={cx('Search')}>
                            <DataServerContextProvider>
                                {' '}
                                <SearchMovieCopy />
                            </DataServerContextProvider>
                        </div>
                    )}
                    <Box sx={{ display: 'flex' }}>
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
                                                    {/* <Tooltip
                                                        className={cx('tooltip')}
                                                        title={<UserPopper />}
                                                        arrow
                                                        TransitionComponent={Zoom}
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                    >
                                                        <div className={cx('user-box')}>
                                                            <UserAvatar />
                                                        </div>
                                                    </Tooltip> */}

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
                        {!currentUser && (
                            <Tooltip title={theme.palette.mode === 'dark' ? 'Change mode' : 'Change mode'}>
                                <IconButton onClick={switchMode} className={cx('mode-switch')} color="inherit">
                                    {theme.palette.mode === 'dark' ? (
                                        <LightModeIcon fontSize="large" />
                                    ) : (
                                        <DarkModeIcon fontSize="large" />
                                    )}
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </MyAppBar>
        </Box>
    );
}

export default Header;
