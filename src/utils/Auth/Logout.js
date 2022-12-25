import classNames from 'classnames/bind';
import { signOut } from 'firebase/auth';

import { Button } from '_/components/subUI';
import { auth } from './firebase/firebaseConfig';

import { faChevronCircleRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './Auth.modelu.scss';

const cx = classNames.bind(styles);

function Logout() {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <Button
            text
            className={cx('user-popper-btn')}
            leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
            rightIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={handleLogout}
        >
            Log out
        </Button>
    );
}

export default Logout;
