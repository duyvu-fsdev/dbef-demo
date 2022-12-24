import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Comments from '_/components/subUI/Comments/Comments';
import { useFireStore } from '_/contexts/FireStoreContext';
import { fetchMovies, getAllUrlParams, showNotifSlice } from '_/Hook/redux/slices';
import AgeNotifications from '_/Popper/AgeNotifications/AgeNotifications';
import Action from './Action';
import styles from './MovieDetails.module.scss';

const cx = classNames.bind(styles);

function MovieDetails() {
    const { userData } = useFireStore();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [is18, setIs18] = useState(false);

    useEffect(() => {
        const slug = getAllUrlParams().name;
        dispatch(fetchMovies(slug))
            .then(unwrapResult)
            .then((result) => {
                return result.movie;
            })
            .then((result) => {
                const {
                    slug,
                    name,
                    episode_total: episodeTotal,
                    episode_current: episodeCurrent,
                    time,
                    quality,
                    origin_name: originName,
                    content,
                    thumb_url: thumbUrl,
                    poster_url: posterUrl,
                    year,
                    category,
                    country,
                    actor,
                    director,
                } = result;

                const data = {
                    category: [],
                };

                category.map((item) => data.category.push(` ${item.name}`));
                setData({
                    slug,
                    name,
                    episodeTotal,
                    episodeCurrent,
                    time,
                    quality,
                    originName,
                    thumbUrl,
                    posterUrl,
                    year,
                    category: data.category.toString(),
                    country: country[0].name.toString(),
                    actor: actor.toString(),
                    director: director.toString(),
                    content: content.replace(/<strong>|<\/strong>|<p>|<\/p>|\\n|&nbsp;|<br>|\\/g, ' '),
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const {
        slug,
        name,
        episodeTotal,
        episodeCurrent,
        time,
        quality,
        originName,
        category,
        country,
        actor,
        director,
        content,
        thumbUrl,
        posterUrl,
        year,
    } = data;

    useEffect(() => {
        category === undefined || category === []
            ? setIs18(false)
            : category.includes(18)
            ? setIs18(true)
            : setIs18(false);
    }, [category]);

    const handleShowNotif = () => {
        dispatch(
            showNotifSlice.actions.showNotif({
                state: true,
            }),
        );
    };
    const handleHideNotif = () => {
        dispatch(
            showNotifSlice.actions.showNotif({
                state: false,
            }),
        );
    };

    const showAction = (is18, hasUser, birthYear) => {
        const age = new Date().getFullYear() - Number(birthYear);

        if (is18 && !hasUser) {
            return (
                <AgeNotifications btnTitle="Log in" msg="Contains 18+ content, please login to watch">
                    <div className={cx('image')}>
                        <img className={cx('img')} src={thumbUrl} alt={name} />
                        <Action data={data} is18={is18} />
                    </div>
                </AgeNotifications>
            );
        } else if (is18 && hasUser) {
            if (age < 18 || !birthYear) {
                return (
                    <AgeNotifications btnTitle="Check profile" msg="Has not updated age or is under 18 years old">
                        <div className={cx('image')}>
                            <img className={cx('img')} src={thumbUrl} alt={name} />
                            <Action data={data} is18={is18} />
                        </div>
                    </AgeNotifications>
                );
            }
        }
        return (
            <div className={cx('image')}>
                <img className={cx('img')} src={thumbUrl} alt={name} />
                <Action data={data} />
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('path')}>
                    <div>Phim / {name || 'Đang cập nhật'}</div>
                </div>

                <div className={cx('info-wrapper')}>
                    <table>
                        <tbody>
                            <tr onMouseEnter={handleShowNotif} onMouseLeave={handleHideNotif}>
                                <th>
                                    <div className={cx('image-container')}>
                                        {showAction(is18, Boolean(userData), userData?.birthYear)}
                                    </div>
                                </th>
                                <th>
                                    <div className={cx('info')}>
                                        <div className={cx('c-info')}>
                                            <div className={cx('content')}>
                                                <div className={cx('name')}>{name || 'Đang cập nhật'}</div>
                                                <div className={cx('origin-name')}>({originName})</div>
                                                <div>Số tập : {episodeTotal || 'Đang cập nhật'}</div>
                                                <div>Trạng thái : {episodeCurrent || 'Đang cập nhật'}</div>
                                                <div>Thời lượng: {time || 'Đang cập nhật'}</div>
                                                <div>Chất lượng: {quality || 'Đang cập nhật'}</div>
                                                <div>Thể loại: {category === ' ' ? 'Đang cập nhật' : category}</div>
                                                <div>Đạo diễn: {director === '' ? 'Đang cập nhật' : director}</div>
                                                <div>Diễn viên: {director === ' ' ? 'Đang cập nhật' : actor}</div>
                                                <div>Quốc gia: {country || 'Đang cập nhật'}</div>
                                                <div>Năm sản xuất : {year || 'Đang cập nhật'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>

                    <div className={cx('desc')}>
                        <h3>Nội dung phim</h3>
                        <div className={cx('desc-content')}>{content}</div>
                        <h3>Poster</h3>
                        <div className={cx('poster')}>
                            <img className={cx('poster-img')} src={posterUrl} alt={name} />
                        </div>
                    </div>

                    {slug && <Comments id={slug} />}
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
