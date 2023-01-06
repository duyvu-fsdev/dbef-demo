import SettingsIcon from '@mui/icons-material/Settings';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import classNames from 'classnames/bind';

import { Button } from '_/components/subUI';
import styles from './NotFoundPage.module.scss';

const cx = classNames.bind(styles);

function NotFoundPage() {
    return (
        <>
            <div className={cx('container')}>
                <h1 className={cx('first-four')}>4</h1>
                <SettingsIcon sx={{ fontSize: '40vmin' }} className={cx('cog1')} />
                <SettingsIcon sx={{ fontSize: '40vmin' }} className={cx('cog2')} />
                <h1 className={cx('second-four')}>4</h1>
                <p className={cx('wrong-para')}>Uh Oh! Page not found!</p>
                <Button
                    outline
                    className={cx('button')}
                    // sx={{
                    //     position: 'absolute',
                    //     bottom: '1vmin',
                    //     padding: '6px 24px',
                    //     color: 'inherit',
                    //     borderColor: 'currentcolor',
                    //     ':hover': {
                    //         color: 'var(--main-color)',
                    //         borderColor: 'currentcolor',
                    //         backgroundColor: '#000000b8',
                    //     },
                    // }}
                    to={'/'}
                >
                    Go to home <TouchAppIcon />
                </Button>
            </div>
            <div className={cx('bottom')}></div>
        </>
    );
}

export default NotFoundPage;
