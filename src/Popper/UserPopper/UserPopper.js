import { faBookmark, faChevronCircleRight, faGears, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { Button } from '_/components/subUI';
import UserAvatar from '_/components/subUI/Avatar/Avatar';
import { Logout } from '_/pages';
import { useAuth } from '_/contexts/AuthContext';
import styles from './UserPopper.module.scss';

const cx = classNames.bind(styles);

function UserPopper({ classes }) {
    const { currentUser } = useAuth();

    return (
        <div className={cx('wrapper')}>
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
                    leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
                    rightIcon={<FontAwesomeIcon icon={faUser} />}
                >
                    Your Profile
                </Button>
                <Button
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
                    rightIcon={<FontAwesomeIcon icon={faBookmark} />}
                >
                    Watch Later
                </Button>
                <Button
                    text
                    className={cx('user-popper-btn')}
                    leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
                    rightIcon={<FontAwesomeIcon icon={faGears} />}
                >
                    Settings
                </Button>
                <div className={cx('logout-btn')}>
                    <Logout />
                </div>
            </div>
        </div>
    );
}

export default UserPopper;
