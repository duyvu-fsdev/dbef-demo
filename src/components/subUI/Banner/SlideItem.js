import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import { Button } from '_/components/subUI';

const cx = classNames.bind(styles);

function SlideItem(props) {
    const { slug, url } = props;

    return (
        <div className={cx('slider')}>
            <Button to={`/phim&name=${slug}`} className={cx('banner-btn')}>
                <img className={cx('banner-img')} src={url} alt="red" />
                <div className={cx('border')}></div>
            </Button>
        </div>
    );
}

export default SlideItem;
