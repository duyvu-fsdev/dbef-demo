import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import classNames from 'classnames/bind';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Button } from '_/components/subUI';
import styles from './Auth.modelu.scss';
import { auth } from './firebase/firebaseConfig';

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
            leftIcon={<ChevronRightIcon fontSize="large" />}
            rightIcon={<LogoutIcon fontSize="large" />}
            onClick={handleLogout}
        >
            Log out
        </Button>
    );
}

export default Logout;
