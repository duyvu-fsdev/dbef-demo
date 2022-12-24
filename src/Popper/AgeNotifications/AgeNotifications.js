import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '_/components/subUI';

import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import { selector } from '_/Hook/redux/selector';
import { Wrapper as PopperWrapper } from '_/Popper';
import styles from './AgeNotifications.module.scss';

const cx = classNames.bind(styles);

function AgeNotifications({ children, msg, btnTitle }) {
    const [btnRender, setBtnRender] = useState();
    const showNotif = useSelector(selector.showNotif);
    const classes = cx(
        'popper',
        //add clasaname for tippy
    );
    useEffect(() => {
        if (btnTitle === 'Check profile') {
            setBtnRender(
                <Button to={'/profile'} primary scale className={cx('to-profile')}>
                    {btnTitle}
                </Button>,
            );
        } else if (btnTitle === 'Log in') {
            setBtnRender(
                <LoginBtn primary scale className={cx('log-in')}>
                    {btnTitle}
                </LoginBtn>,
            );
        }
    }, [btnTitle]);

    return (
        <Tippy
            visible={showNotif}
            interactive
            placement="right-end"
            render={(attrs) => (
                <div className={classes} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('popper-container')}>
                        <div className={cx('content')}>
                            <div className={cx('title')}>
                                <h2>Warning !!!!</h2>
                            </div>
                            <p className={cx('text')}>{msg}</p>
                            <div className={cx('action')}>{btnRender}</div>
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default AgeNotifications;
