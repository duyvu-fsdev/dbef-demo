import { doc, updateDoc } from '@firebase/firestore';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MyTextField } from '_/components/CustomComponents/CustomComponents';
import { Button } from '_/components/subUI';
import { showModalSlice } from '_/Hook/redux/slices';
import { useFireStore } from '../../contexts/FireStoreContext';
import removeVietnameseTones from '../removeVietnameseTones';
import styles from './Auth.modelu.scss';
import { db } from './firebase/firebaseConfig';

const cx = classNames.bind(styles);

function EditInfoUser() {
    const dispatch = useDispatch();
    const [gender, setGender] = useState('female');
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
        const updateDataDoc = {
            birthYear: birthYear ? Number(birthYear) : 0,
            phoneNumber: Number(phoneNumber),
            gender,
        };
        updateDoc(ref, updateDataDoc).then(() => {
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
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
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
