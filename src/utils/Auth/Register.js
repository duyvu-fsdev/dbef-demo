import classNames from 'classnames/bind';
import { updateProfile } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import FacebookIcon from '@mui/icons-material/Facebook';
import { TextField } from '@mui/material';
import { Button } from '_/components/subUI';
import { changeFormSlice, showModalSlice, showNotifSlice } from '_/Hook/redux/slices';
import { useAuth } from '_/contexts/AuthContext';
import styles from './Auth.modelu.scss';
import addDocument from './firebase/addDocument';

const cx = classNames.bind(styles);

function Register() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register, signInWithFaceBook } = useAuth();
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
        const fullName = `${firstName.split(' ')} ${lastName.split(' ')[0]}`.replace(/ + /g, ' ');
        console.log({ fullName });
        e.preventDefault();
        if (password === confirmPassword) {
            register(email, confirmPassword, fullName)
                .then((user) => {
                    updateProfile(user.user, {
                        displayName: fullName,
                    });
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    dispatch(
                        showModalSlice.actions.showModal({
                            state: false,
                        }),
                    );

                    handleShowSnackbar({ type: 'success', open: true, message: 'Sign up success & auto log in !' });
                    handleHideSnackbar();

                    addDocument(user, fullName);
                })

                .catch((error) => {
                    if (error.message.includes('email-already-in-use')) {
                        handleShowSnackbar({ type: 'warning', open: true, message: 'User already exists !' });
                        handleHideSnackbar();
                    }
                });
        } else {
            handleShowSnackbar({
                type: 'warning',
                open: true,
                message: "Password & Confirm Password doesn't match !",
            });
            handleHideSnackbar();
        }
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
                handleShowSnackbar({ type: 'success', open: true, message: 'Sign up success & auto log in !' });
                handleHideSnackbar();
                addDocument(user);
            })
            .catch((e) => console.log(e.message));
    };

    const handleChangeToLoginForm = () => {
        dispatch(
            changeFormSlice.actions.changeForm({
                state: { login: true, forgot: false, reg: false, edit: false },
            }),
        );
    };

    const style = {
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    };
    return (
        <div className={cx('auth-wrapper')}>
            <div className={cx('auth-form-wrapper')}>
                <h1 className={cx('auth-h1')}>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={cx('divide')}>
                        <TextField
                            sx={style}
                            className={cx('auth-input')}
                            size="small"
                            label="Enter FirstName"
                            required
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                const letter = e.target.value;
                                if (!letter.startsWith(' ')) {
                                    setFirstName(
                                        letter
                                            .replace(/ + /g, ' ')
                                            .trim()
                                            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                    );
                                }
                            }}
                        />
                        <TextField
                            sx={style}
                            className={cx('auth-input')}
                            size="small"
                            label="Enter LastName"
                            required
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                const letter = e.target.value;
                                if (!letter.startsWith(' ')) {
                                    setLastName(
                                        letter
                                            .replace(/ + /g, ' ')
                                            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                    );
                                }
                            }}
                        />
                    </div>

                    <TextField
                        sx={style}
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

                    <TextField
                        sx={style}
                        autoComplete="on"
                        className={cx('auth-input')}
                        size="small"
                        label="Enter Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <TextField
                        sx={style}
                        autoComplete="on"
                        className={cx('auth-input')}
                        size="small"
                        label="Confirm Password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <Button primary className={cx('auth-btn')} type="submit">
                        Sign up
                    </Button>
                </form>
                <p className={cx('divide')}>or</p>
                <Button onClick={handleAuthFbLogin} primary className={cx('auth-btn fb-auth')}>
                    Sign up with
                    <FacebookIcon color="action" fontSize="large" />
                </Button>
                <div className={cx('divide ')}>
                    <p>Have an account ?</p>
                    <Button onClick={handleChangeToLoginForm} className={cx('text-underline')} text>
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
