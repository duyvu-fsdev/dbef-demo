import { useTheme } from '@emotion/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

import classNames from 'classnames/bind';
import { useMode } from '_/contexts/ThemeMuiContext';

import styles from './ModeSwitcher.module.scss';

const cx = classNames.bind(styles);

function ModeSwitcher() {
    const theme = useTheme();
    const { switchMode } = useMode();

    const tooltip = theme.palette.mode === 'dark' ? 'change to light mode' : 'change to dark mode';

    return (
        <>
            <Tooltip className={cx('tooltip')} title={tooltip}>
                <IconButton className={cx('mode-switch')} onClick={switchMode} color="inherit">
                    {theme.palette.mode === 'dark' ? (
                        <LightModeIcon fontSize="large" />
                    ) : (
                        <DarkModeIcon fontSize="large" />
                    )}
                </IconButton>
            </Tooltip>
        </>
    );
}

export default ModeSwitcher;
