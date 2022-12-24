import classNames from 'classnames/bind';

import { Tooltip } from '@mui/material';
import { Wrapper as PopperWrapper } from '_/Popper';
import ContentPopper from './ContentPopper';
import styles from './SidebarPopper.module.scss';

const cx = classNames.bind(styles);

function SidebarPopper({ children, content = [], placement }) {
    const renderContent = () => {
        return content.map((item, index) => <ContentPopper key={index} data={item} />);
    };

    const classes = cx(
        'popper',
        //add clasaname for tippy
    );
    return (
        <Tooltip
            sx={{ fontSize: 26 }}
            placement={placement}
            arrow
            title={
                <>
                    <div className={classes}>
                        <PopperWrapper className={cx('popper-container')}>{renderContent()}</PopperWrapper>
                    </div>
                </>
            }
        >
            {children}
        </Tooltip>
    );
}

export default SidebarPopper;
