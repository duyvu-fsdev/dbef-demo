import classNames from 'classnames/bind';
import Calendar from 'moedim';
import { useEffect, useState } from 'react';

import styles from './DateTime.module.scss';

const cx = classNames.bind(styles);

DateTime.propTypes = {};

function DateTime() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Calendar className={cx('calendar')} onChange={() => {}} />
            <div className={cx('clock')}>{clockState}</div>
        </div>
    );
}

export default DateTime;
