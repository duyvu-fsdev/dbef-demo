import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { memo } from 'react';

import ListEp from './ListEp';
import styles from './VideoPlay.module.scss';

const cx = classNames.bind(styles);

function VideoPlay(data) {
    const { sv_data, sv_name, slug, name, ep, onEpChange, epShow, id } = data;
    const src = sv_data[id];

    const renderContent = (slug) => {
        return sv_data.map((item, index) => (
            <ListEp key={index} data={item} slug={slug} onEpChange={onEpChange} id={index} />
        ));
    };

    const testEnd = () => {
        // console.log('id');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Box className={cx('video-container')}>
                    <div className={cx('video-inner')}>
                        <div className={cx('video-box')}>
                            <iframe
                                className={cx('video')}
                                src={src === undefined ? '' : src.link_embed}
                                scrolling="no"
                                title="alo"
                                allowFullScreen={true}
                                onEnded={testEnd}
                            />
                        </div>
                    </div>
                    <Box className={cx('video-Episodes')}>
                        <div className={cx('title')}>
                            {name} / tập {epShow || ep}
                        </div>
                        <div className={cx('eps')}>{sv_name} - Episodes</div>

                        <Box className={cx('e-box')}>{renderContent(slug)}</Box>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default memo(VideoPlay);
