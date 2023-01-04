// import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { changeFormSlice, showModalSlice } from '_/Hook/redux/slices';
import Button from '../Button/Button';

import styles from './LoginBtn.module.scss';

const cx = classNames.bind(styles);

const LoginBtn = ({ className, children, disable = false }) => {
    const dispatch = useDispatch();
    const handleShowModal = () => {
        dispatch(
            showModalSlice.actions.showModal({
                state: true,
            }),
        );
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: true },
            }),
        );
    };

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <Button outline disable={disable} onClick={handleShowModal} className={classes}>
            {children}
            {/* <LoginIcon /> */}
        </Button>
    );
};

export default LoginBtn;
