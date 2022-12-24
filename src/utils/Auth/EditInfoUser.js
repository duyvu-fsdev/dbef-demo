import { doc, updateDoc } from '@firebase/firestore';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '_/components/subUI';
import { showModalSlice } from '_/Hook/redux/slices';
import { useFireStore } from '../../contexts/FireStoreContext';
import removeVietnameseTones from '../removeVietnameseTones';
import styles from './Auth.modelu.scss';
import { db } from './firebase/firebaseConfig';

const cx = classNames.bind(styles);

function EditInfoUser() {
    const dispatch = useDispatch();
    const [gender, setGender] = useState('0');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id } = userData;
        const ref = doc(db, 'users', id);
        let uGender;
        switch (gender) {
            case 1:
                uGender = 'Male';
                break;
            case 2:
                uGender = 'Female';
                break;
            case 3:
                uGender = 'Orther';
                break;

            default:
                uGender = '';
                break;
        }
        const updateDataDoc = {
            birthYear,
            phoneNumber,
            uGender,
        };
        updateDoc(ref, updateDataDoc).then(() => {
            dispatch(
                showModalSlice.actions.showModal({
                    state: false,
                }),
            );
        });
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
                <h1 className={cx('auth-h1')}>EditInfoUser</h1>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Phone Number"
                        sx={style}
                        className={cx('auth-input')}
                        size="small"
                        type="text"
                        value={phoneNumber}
                        required
                        onChange={(e) => {
                            let letter = e.target.value;
                            if (!letter.startsWith(' ')) {
                                letter = removeVietnameseTones(letter).replace(/-|[A-z]/g, '');
                                setMobileNumber(letter.replace(/ /g, '').replace(/-/g, '').trim());
                            }
                        }}
                    />
                    <div>
                        <TextField
                            label="Year of Birth (YYYY)"
                            sx={style}
                            className={cx('auth-input')}
                            size="small"
                            type="text"
                            value={birthYear}
                            required
                            onChange={(e) => {
                                let letter = e.target.value;
                                setbirthYear(() => {
                                    if (!letter.startsWith(' '))
                                        letter = removeVietnameseTones(letter)
                                            .replace(/-|[A-z]| |/g, '')
                                            .trim()
                                            .slice(0, 4);

                                    const currentYear = Number(new Date().getFullYear());
                                    if (Number(letter) > currentYear) letter = currentYear.toString();
                                    return letter;
                                });
                            }}
                        />
                    </div>

                    <InputLabel id="Gender">Choose gender</InputLabel>
                    <Select
                        sx={{ width: '100%' }}
                        size="small"
                        labelId="Gender"
                        id="Gender"
                        value={gender}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            setGender(value);
                        }}
                    >
                        <MenuItem value={0}>--</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                        <MenuItem value={3}>Orther</MenuItem>
                    </Select>

                    <Button primary className={cx('auth-btn')} type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default EditInfoUser;
