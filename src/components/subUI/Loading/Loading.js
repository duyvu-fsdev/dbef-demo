import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('lds-dual-ring')}></div>
            <h2>Please wait a few seconds. I am loading data...</h2>
        </div>
    );
}

export default Loading;
