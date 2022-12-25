import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MyTextField } from '_/components/CustomComponents/CustomComponents';
import { Button } from '_/components/subUI';
import { useAuth } from '_/contexts/AuthContext';
import { changeFormSlice, showNotifSlice } from '_/Hook/redux/slices';
import styles from './Auth.modelu.scss';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuth();
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const handleShowSnackbar = (state) => {
        dispatch(
            showNotifSlice.actions.showNotif({
                state: state,
            }),
        );
    };

    const handleHideSnackbar = () => {
        setTimeout(function () {
            dispatch(
                showNotifSlice.actions.showNotif({
                    state: { open: false, message: '', type: '' },
                }),
            );
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        forgotPassword(email)
            .then((res) => {
                handleShowSnackbar({
                    styleOveride: { color: '#f44336' },
                    type: 'error',
                    open: true,
                    message: `Mail đã được gửi tới hòm thư ${email} Vui lòng kiểm tra hòm thư và spam`,
                });
                handleHideSnackbar();
            })
            .catch((error) => {
                setEmail('');
                handleShowSnackbar({
                    styleOveride: { color: '#f44336' },
                    type: 'error',
                    open: true,
                    message: `Địa chỉ mail ${email} chưa được đăng kí !`,
                });
                handleHideSnackbar();
            });
        // eslint-disable-next-line no-restricted-globals
        // .finally(() => location.replace('http://localhost:3000/'));
    };

    const handleChangeToRegisterForm = () => {
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: false, forgot: false, reg: true, edit: false },
            }),
        );
    };
    const handleChangeToLoginForm = () => {
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: true, logout: false, reg: false, edit: false },
            }),
        );
    };

    return (
        <div className={cx('fogot-wrapper')}>
            <div className={cx('auth-form-wrapper')}>
                <h1 className={cx('auth-h1')}>Forgot password</h1>
                <form onSubmit={handleSubmit}>
                    <MyTextField
                        className={cx('auth-input')}
                        size="small"
                        label="Enter Email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Button primary type="submit" className={cx('auth-btn')}>
                        Forgot password?
                    </Button>
                </form>

                <div className={cx('divide border-top')}>
                    <p>Now</p>
                    <Button onClick={handleChangeToLoginForm} className={cx('text-underline')} text>
                        Log in
                    </Button>
                    <p>or</p>
                    <Button onClick={handleChangeToRegisterForm} className={cx('text-underline')} text>
                        Sign up new user
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
