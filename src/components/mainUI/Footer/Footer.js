import classNames from 'classnames/bind';
import { LogoIcon } from '_/assets/Icon';
import { Button } from '_/components/subUI';
import { routes } from '_/pages/routes';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Button href={routes.home} className={cx('logo')}>
                    <LogoIcon />
                </Button>
            </div>
        </div>
    );
}

export default Footer;
