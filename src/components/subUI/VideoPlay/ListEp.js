import classNames from 'classnames/bind';
import { memo } from 'react';
import Button from '../Button/Button';

import styles from './VideoPlay.module.scss';

const cx = classNames.bind(styles);

function ListEp(props) {
    const { data, slug, onEpChange, id } = props;
    const handleEpchange = (newEp, epShow, id) => {
        if (onEpChange) {
            onEpChange(newEp, epShow, id);
        }
    };

    return (
        <Button
            onClick={() => handleEpchange(id + 1, data.name, id)}
            to={`/xem-phim&name=${slug}&id=${id}&ep=${data.name}`}
            className={cx('e-num')}
        >
            {data.name}
        </Button>
    );
}

export default memo(ListEp);
