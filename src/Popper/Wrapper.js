import styles from './Popper.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default memo(Wrapper);
