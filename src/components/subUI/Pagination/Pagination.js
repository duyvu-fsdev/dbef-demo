import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';

import { useThemMui } from '_/contexts/ThemeMuiContext';
import { getAllUrlParams } from '_/Hook/redux/slices';
import Button from '../Button/Button';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { color } = useThemMui();
    const [pageInput, setPageInput] = useState(parseInt(getAllUrlParams().page));
    const { pagination, onPageChange } = props;
    // eslint-disable-next-line no-unused-vars
    const { totalItems, totalItemsPerPage, currentPage, totalPages } = pagination;

    const handlePageChange = (newPage) => {
        setPageInput(newPage);
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    let style;

    if (currentPage <= 1) {
        style = {
            pointerEventsPreV: 'none',
            opacityPrev: 0.5,
        };
    } else if (currentPage >= totalPages) {
        style = {
            pointerEventsNext: 'none',
            opacityNext: 0.5,
        };
    } else {
        style = {
            // pointerEventsPreV: 'fill',
            // pointerEventsNext: 'fill',
        };
    }

    const handlePageChangeWithInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\\..*?)\\..*/g, '$1');
        setPageInput(+e.target.value);
    };
    return (
        <div
            className={cx('wrapper')}
            style={{
                '--background-color': color,
            }}
        >
            <Button
                className={cx('prev-button')}
                style={{
                    '--pointer-events': `${style.pointerEventsPreV}`,
                    '--opacity': `${style.opacityPrev}`,
                }}
                to={`/danh-sach/phim-moi-cap-nhat&page=${currentPage - 1}.html`}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeftIcon fontSize="large" />
            </Button>

            <div className={cx('current-page')}>
                {currentPage} / {totalPages}
            </div>

            <Button
                className={cx('next-button')}
                style={{
                    '--pointer-events': `${style.pointerEventsNext}`,
                    '--opacity': `${style.opacityNext}`,
                }}
                to={`/danh-sach/phim-moi-cap-nhat&page=${currentPage + 1}.html`}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronRightIcon fontSize="large" />
            </Button>

            <input
                className={cx('page-input')}
                value={pageInput}
                placeholder="nhap trang"
                onChange={handlePageChangeWithInput}
                type="text"
            />

            <Button
                className={cx('go-button')}
                style={{
                    '--pointer-events': `${style.pointerEventsNext}`,
                    '--opacity': `${style.opacityNext}`,
                }}
                to={`/danh-sach/phim-moi-cap-nhat&page=${pageInput}.html `}
                disabled={currentPage >= totalPages}
                onClick={() => {
                    if (pageInput <= 0 || pageInput > totalPages || pageInput === '') {
                        alert(`Vui lòng nhập số trang có giá trị từ 1 đến ${totalPages}`);
                    } else handlePageChange(pageInput);
                }}
            >
                Go
            </Button>
        </div>
    );
}

export default memo(Pagination);
