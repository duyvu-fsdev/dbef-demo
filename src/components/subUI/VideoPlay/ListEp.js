import classNames from 'classnames/bind';
import { useThemMui } from '_/contexts/ThemeMuiContext';

import Button from '../Button/Button';
import styles from './VideoPlay.module.scss';

const cx = classNames.bind(styles);

function ListEp(props) {
    const { color } = useThemMui();
    const { data, slug, onEpChange, id } = props;
    const handleEpchange = (newEp, epShow, id) => {
        if (onEpChange) {
            onEpChange(newEp, epShow, id);
        }
    };

    return (
        <Button
            style={{
                '--background-color': color,
            }}
            onClick={() => handleEpchange(id + 1, data.name, id)}
            to={`/dbef-demo/xem-phim&name=${slug}&id=${id}&ep=${data.name}`}
            className={cx('e-num')}
        >
            {data.name}
        </Button>
    );
}

export default ListEp;
