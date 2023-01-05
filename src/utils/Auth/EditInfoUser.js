import { doc, updateDoc } from '@firebase/firestore';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import images from '_/assets/img';
import { MyTextField } from '_/components/CustomComponents/CustomComponents';
import { Button } from '_/components/subUI';
import { showLoadingSlice, showModalSlice, showNotifSlice } from '_/Hook/redux/slices';
import { useFireStore } from '../../contexts/FireStoreContext';
import removeVietnameseTones from '../removeVietnameseTones';
import styles from './Auth.modelu.scss';
import { db } from './firebase/firebaseConfig';

const cx = classNames.bind(styles);

function EditInfoUser() {
    const dispatch = useDispatch();
    const [gender, setGender] = useState('Female');
    const [avatar, setAvatar] = useState('undefined');
    const [birthYear, setbirthYear] = useState('');
    const [phoneNumber, setMobileNumber] = useState('');
    const mounted = useRef(false);
    const { userData } = useFireStore();

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
        dispatch(
            showLoadingSlice.actions.showLoading({
                state: true,
            }),
        );

        const age = new Date().getFullYear() - Number(birthYear);
        if (Boolean(birthYear) && age > 110) {
            dispatch(
                showLoadingSlice.actions.showLoading({
                    state: false,
                }),
            );
            handleShowSnackbar({
                type: 'warning',
                open: true,
                message: 'Invalid birthYear !',
            });
            handleHideSnackbar();
            return;
        }

        e.preventDefault();
        const { id } = userData;
        const ref = doc(db, 'users', id);

        const updateDataDoc = (() => {
            const avatarUrl = avatar === 'undefined' ? null : avatar;

            if (!Boolean(birthYear) && !phoneNumber) return { gender, avatarUrl };
            if (!Boolean(birthYear) && phoneNumber) return { gender, phoneNumber, avatarUrl };
            if (birthYear && !phoneNumber) return { gender, birthYear, avatarUrl };
            return {
                birthYear,
                phoneNumber,
                gender,
                avatarUrl,
            };
        })();

        console.log({ updateDataDoc });

        updateDoc(ref, updateDataDoc).then(() => {
            dispatch(
                showLoadingSlice.actions.showLoading({
                    state: false,
                }),
            );
            dispatch(
                showModalSlice.actions.showModal({
                    state: false,
                }),
            );
        });
    };

    return (
        <div className={cx('auth-wrapper')}>
            <div className={cx('auth-form-wrapper')}>
                <h1 className={cx('auth-h1')}>EditInfoUser</h1>

                <FormControl fullWidth onSubmit={handleSubmit}>
                    <MyTextField
                        label="Phone Number"
                        className={cx('auth-input')}
                        size="small"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                            let letter = e.target.value;
                            if (!letter.startsWith(' ')) {
                                letter = removeVietnameseTones(letter).replace(/-|[A-z]/g, '');
                                setMobileNumber(letter.replace(/ /g, '').replace(/-/g, '').trim());
                            }
                        }}
                    />
                    <div>
                        <MyTextField
                            label="Year of Birth (YYYY)"
                            className={cx('auth-input')}
                            size="small"
                            type="text"
                            value={birthYear}
                            onChange={(e) => {
                                let letter = e.target.value;
                                if (!letter.startsWith(' ')) {
                                    letter = removeVietnameseTones(letter)
                                        .replace(/-|[A-z]/g, '')
                                        .replace(/ /g, '')
                                        .replace(/-/g, '')
                                        .trim()
                                        .slice(0, 4);
                                    const currentYear = Number(new Date().getFullYear());
                                    if (Number(letter) > currentYear) letter = currentYear.toString();
                                    setbirthYear(letter);
                                }
                            }}
                        />
                    </div>

                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender}
                        onChange={(e) => {
                            const value = e.target.value;
                            setGender(value);
                        }}
                    >
                        <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant="h6">Female</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant="h6">Male</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value="Orther"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant="h6">Other</Typography>
                                </Box>
                            }
                        />
                    </RadioGroup>

                    <FormLabel id="demo-row-radio-buttons-group-label">Customs Avatar</FormLabel>

                    <RadioGroup
                        sx={{ display: 'grid', gridTemplateColumns: 'repeat( 4, minmax(25%, 1fr))' }}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={avatar}
                        onChange={(e) => {
                            const value = e.target.value;
                            setAvatar(value);
                        }}
                    >
                        <FormControlLabel
                            sx={{
                                m: 0,
                                display: 'flex',
                                textAlign: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            value="undefined"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img className={cx('avartar')} src={images.not} alt="Loading" />
                                </Box>
                            }
                        />
                        <FormControlLabel
                            sx={{
                                m: 0,
                                display: 'flex',
                                textAlign: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            value="https://www.w3schools.com/howto/img_avatar2.png"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img className={cx('avartar')} src={images.female} alt="Loading" />
                                </Box>
                            }
                        />
                        <FormControlLabel
                            sx={{
                                m: 0,
                                display: 'flex',
                                textAlign: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            value="https://www.w3schools.com/howto/img_avatar.png"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img className={cx('avartar')} src={images.male} alt="Loading" />
                                </Box>
                            }
                        />
                        <FormControlLabel
                            sx={{
                                m: 0,
                                display: 'flex',
                                textAlign: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            value="https://www.w3schools.com/w3images/avatar5.png"
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <img className={cx('avartar')} src={images.orther} alt="Loading" />
                                </Box>
                            }
                        />
                    </RadioGroup>

                    <Button primary className={cx('auth-btn')} type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </FormControl>
            </div>
        </div>
    );
}

export default EditInfoUser;
