import classNames from 'classnames/bind';
import { routes } from '_/pages/routes';
import Button from '../Button/Button';
import styles from './GenresPopper.module.scss';

const cx = classNames.bind(styles);

function GenresPopper() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('genre-popper-actions')}>
                <Button href={routes.action} text className={cx('genre-popper-btn')}>
                    Action
                </Button>
                <Button href={routes.comedy} text className={cx('genre-popper-btn')}>
                    Comedy
                </Button>
                <Button href={routes.martial_arts} text className={cx('genre-popper-btn')}>
                    Martial Arts
                </Button>
                <Button href={routes.shounen} text className={cx('genre-popper-btn')}>
                    Shounen
                </Button>
                <Button href={routes.super_power} text className={cx('genre-popper-btn')}>
                    Super Power
                </Button>
            </div>
        </div>
    );
}

export default GenresPopper;
