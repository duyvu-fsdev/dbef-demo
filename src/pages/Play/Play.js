import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VideoPlay } from '_/components/subUI';
import Comments from '_/components/subUI/Comments/Comments';
import { fetchMovies, getAllUrlParams } from '_/Hook/redux/slices';

import styles from './Play.module.scss';

const cx = classNames.bind(styles);

function Play() {
    const dispatch = useDispatch();
    const [value, setValue] = useState([]);
    const [episode, setEpisode] = useState({
        server_data: [],
        server_name: '',
    });

    const [filter, setFilter] = useState({
        slug: getAllUrlParams().name,
        ep: getAllUrlParams().ep,
        id: getAllUrlParams().id,
        epShow: '',
    });

    useEffect(() => {
        dispatch(fetchMovies(filter.slug))
            .then(unwrapResult)
            .then((result) => {
                setEpisode(result.episodes[0]);
                setValue(result.movie);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEpChange = (newEp, epShow, id) => {
        setFilter({
            ...filter,
            ep: newEp,
            id,
            epShow,
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('path')}></div>
                <VideoPlay
                    sv_data={episode.server_data}
                    sv_name={episode.server_name}
                    slug={value.slug}
                    name={value.name}
                    ep={filter.ep}
                    id={filter.id}
                    onEpChange={handleEpChange}
                    src={episode.server_data[filter.ep]}
                    epShow={filter.epShow}
                />
                {value.slug && <Comments id={value.slug} />}
            </div>
        </div>
    );
}

export default Play;
