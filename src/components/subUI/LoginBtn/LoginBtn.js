// import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { changeFormSlice, showModalSlice } from '_/Hook/redux/slices';
import Button from '../Button/Button';

import styles from './LoginBtn.module.scss';

const cx = classNames.bind(styles);

const LoginBtn = ({ className, children }) => {
    const dispatch = useDispatch();
    const handleShowModal = () => {
        dispatch(
            showModalSlice.actions.showModal({
                state: true,
            }),
        );
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: true, fogot: false, reg: false, edit: false },
            }),
        );
    };

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        // <button onClick={handleShowModal} className={classes} {...props}>
        //     <span className={cx('title')}>{children}</span>
        // </button>
        <Button outline onClick={handleShowModal} className={classes}>
            {children}
            {/* <LoginIcon /> */}
        </Button>
    );
};

export default memo(LoginBtn);
