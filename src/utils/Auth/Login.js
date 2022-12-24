import FacebookIcon from '@mui/icons-material/Facebook';
import { TextField } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '_/components/subUI';
import { changeFormSlice, showModalSlice, showNotifSlice } from '_/Hook/redux/slices';
import { useAuth } from '_/contexts/AuthContext';
import styles from './Auth.modelu.scss';
import addDocument from './firebase/addDocument';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, signInWithFaceBook } = useAuth();
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
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(email, password)
            // eslint-disable-next-line no-restricted-globals
            .then((user) => {
                addDocument(user);
                dispatch(
                    showModalSlice.actions.showModal({
                        state: false,
                    }),
                );
                dispatch(
                    changeFormSlice.actions.changeForm({
                        state: false,
                    }),
                );

                handleShowSnackbar({
                    type: 'success',
                    open: true,
                    message: 'Log in success !',
                });

                handleHideSnackbar();
            })
            .catch((error) => {
                if (error.message.includes('wrong-password')) {
                    handleShowSnackbar({
                        styleOveride: { color: '#f44336' },
                        type: 'error',
                        open: true,
                        message: 'Password is incorrect !',
                    });

                    handleHideSnackbar();
                } else if (error.message.includes('user-not-found')) {
                    dispatch(
                        showNotifSlice.actions.showNotif({
                            state: {
                                styleOveride: { color: '#f44336' },
                                type: 'error',
                                open: true,
                                message: 'User does not exist !',
                            },
                        }),
                    );
                    handleHideSnackbar();
                } else if (error.message.includes('too-many-requests')) {
                    handleShowSnackbar({
                        styleOveride: { color: '#f44336' },
                        type: 'error',
                        open: true,
                        message:
                            'Many failed login. Please try again later or  resetting your password to immediately restore !',
                    });
                    handleHideSnackbar();
                } else {
                    dispatch(
                        handleShowSnackbar({
                            styleOveride: { color: '#f44336' },
                            type: 'error',
                            open: true,
                            message: 'Unspecified error !',
                        }),
                    );
                    handleHideSnackbar();
                }
            });
    };

    const handleAuthFbLogin = () => {
        signInWithFaceBook()
            .then((user) => {
                dispatch(
                    showModalSlice.actions.showModal({
                        state: false,
                    }),
                );
                dispatch(
                    changeFormSlice.actions.changeForm({
                        state: false,
                    }),
                );

                handleShowSnackbar({
                    type: 'success',
                    open: true,
                    message: 'Log in success !',
                });

                handleHideSnackbar();
                addDocument(user);
            })
            .catch((e) => console.log(e.message));
    };

    const handleChangeToRegisterForm = () => {
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: false, forgot: false, reg: true, edit: false },
            }),
        );
    };

    const handleChangeToFogotPasswordForm = () => {
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: false, forgot: true, reg: false, edit: false },
            }),
        );
    };

    const style = {
        '& label.Mui-focused': {
            color: '#fff',
        },
        // '& .MuiOutlinedInput-root:hover': { borderColor: 'red' },
        '& .MuiOutlinedInput-root': {
            '& input': { color: '#fff' },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    };

    return (
        <div className={cx('auth-wrapper')}>
            <div className={cx('auth-form-wrapper')}>
                <h1 className={cx('auth-h1')}>Log in</h1>

                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={style}
                        className={cx('auth-input')}
                        size="small"
                        label="Enter Email"
                        required
                        type=""
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        sx={style}
                        autoComplete="off"
                        className={cx('auth-input')}
                        size="small"
                        label="Enter Password"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <Button primary className={cx('auth-btn')} type="submit">
                        Log in
                    </Button>
                </form>
                <p className={cx('divide')}>or</p>
                <Button onClick={handleAuthFbLogin} primary className={cx('auth-btn fb-auth')}>
                    Log in with
                    <FacebookIcon color="action" fontSize="large" />
                </Button>
                <div className={cx('divide')}>
                    <Button onClick={handleChangeToFogotPasswordForm} className={cx('text-underline')} text>
                        Forgot Password ?
                    </Button>
                </div>
                <div className={cx('divide border-top')}>
                    <p>Don't have an account ?</p>
                    <Button onClick={handleChangeToRegisterForm} className={cx('text-underline')} text>
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
