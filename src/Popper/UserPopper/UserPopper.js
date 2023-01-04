import { useTheme } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import classNames from 'classnames/bind';

import { Button } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import { useAuth } from '_/contexts/AuthContext';
import { useThemMui } from '_/contexts/ThemeMuiContext';
import { Logout } from '_/pages';
import styles from './UserPopper.module.scss';

const cx = classNames.bind(styles);

function UserPopper({ classes }) {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const { switchMode } = useThemMui();

    return (
        <Box className={cx('wrapper')}>
            <div className={cx('user-popper-actions')}>
                <div className={cx('user-box')}>
                    <div className={cx('avatar')}>
                        <UserAvatar className={classes} />
                    </div>
                    <h3 className={cx('display-name')}>{currentUser.displayName}</h3>
                </div>
                <Button
                    to={'/profile'}
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<ChevronRightIcon fontSize="large" />}
                    rightIcon={<AccountCircleIcon fontSize="large" />}
                >
                    Profile
                </Button>
                <Button
                    to={'/watchlater'}
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<ChevronRightIcon fontSize="large" />}
                    rightIcon={<BookmarkAddIcon fontSize="large" />}
                >
                    Watch Later
                </Button>
                <Button
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<ChevronRightIcon fontSize="large" />}
                    rightIcon={<SettingsIcon fontSize="large" />}
                >
                    Settings
                </Button>
                <Button
                    onClick={switchMode}
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<ChevronRightIcon fontSize="large" />}
                    rightIcon={
                        <Box className={cx('mode-switch')} color="inherit">
                            {theme.palette.mode === 'dark' ? (
                                <LightModeIcon fontSize="large" />
                            ) : (
                                <DarkModeIcon fontSize="large" />
                            )}
                        </Box>
                    }
                >
                    {theme.palette.mode === 'dark' ? 'Change mode' : 'Change mode'}
                </Button>

                <div className={cx('logout-btn')}>
                    <Logout />
                </div>
            </div>
        </Box>
    );
}

export default UserPopper;
