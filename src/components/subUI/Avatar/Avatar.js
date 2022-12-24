import { Avatar } from '@mui/material';
import classNames from 'classnames/bind';

import { useAuth } from '_/contexts/AuthContext';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function UserAvatar({ style, className }) {
    const { currentUser } = useAuth();
    function stringToColor(string) {
        let hash = 0;
        let i;

        if (string) {
            /* eslint-disable no-bitwise */
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }

            let color = '#';

            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2);
            }
            /* eslint-enable no-bitwise */

            return color;
        }
    }

    function stringAvatar(name) {
        if (name) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    }

    const classes = cx('avatar', {
        [className]: className,
    });

    if (!currentUser) return;

    return currentUser.photoURL ? (
        <Avatar alt={currentUser.displayName} src={currentUser.photoURL} sx={style} className={cx('avatar')} />
    ) : (
        <Avatar
            style={{ backgroundColor: stringToColor(currentUser.displayName) }}
            {...stringAvatar(currentUser.displayName)}
            sx={style}
            className={classes}
        />
    );
}

export default UserAvatar;
