import { Box, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MyTooltip } from '_/components/CustomComponents/CustomComponents';
import { Button } from '_/components/subUI';
import Comments from '_/components/subUI/Comments/Comments';
import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import { useFireStore } from '_/contexts/FireStoreContext';
import { fetchMovies, getAllUrlParams } from '_/Hook/redux/slices';
import Action from './Action';
import styles from './MovieDetails.module.scss';

const cx = classNames.bind(styles);

function MovieDetails() {
    const dispatch = useDispatch();
    const { fireStoreData } = useFireStore();
    const [currentMovieInfo, setCurrentMovieInfo] = useState({ currentMovie: {}, is18: false, hasUser: false });
    const { currentMovie, is18, hasUser } = currentMovieInfo;
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
    } = currentMovie;
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
                //setData
                const currentMovie = {
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
                };
                let is18, hasUser;
                currentMovie.category === undefined || !currentMovie.category.length
                    ? (is18 = false)
                    : currentMovie.category.includes(18)
                    ? (is18 = true)
                    : (is18 = false);

                !fireStoreData
                    ? (hasUser = false)
                    : fireStoreData.currentUserData
                    ? (hasUser = true)
                    : (hasUser = false);

                setCurrentMovieInfo({ currentMovie, is18, hasUser });
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fireStoreData, category]);

    const positionRef = useRef({
        x: 0,
        y: 0,
    });
    const popperRef = useRef(null);
    const areaRef = useRef(null);

    const showAction = (is18, hasUser, birthYear) => {
        const age = new Date().getFullYear() - Number(birthYear);
        let btnRender = () => {};
        let msg = '';
        if (!hasUser) {
            msg = 'Contains 18+ content, please login to watch';
            btnRender = () => (
                <LoginBtn primary scale className={cx('log-in')}>
                    Log in
                </LoginBtn>
            );
        } else if (hasUser && (age < 18 || new Date().getFullYear())) {
            msg = 'Has not updated age or is under 18 years old';
            btnRender = () => (
                <Button to={'/profile'} primary scale className={cx('to-profile')}>
                    Check profile
                </Button>
            );
        }

        const handleMouseMove = (e) => {
            positionRef.current = { y: e.clientY };

            if (popperRef.current != null) {
                popperRef.current.update();
            }
        };

        return (is18 && (age < 18 || age === new Date().getFullYear())) || (is18 && !hasUser) ? (
            <MyTooltip
                placement="right"
                arrow
                PopperProps={{
                    popperRef,
                    anchorEl: {
                        getBoundingClientRect: () => {
                            const position = areaRef.current.getBoundingClientRect();
                            const { y } = positionRef.current;
                            const { width, x } = position;
                            return new DOMRect(width + x, y, 0, 0);
                        },
                    },
                }}
                title={
                    <div className={cx('tooltip-content')}>
                        <div className={cx('tooltip-title')}>
                            <h2>Warning !!!!</h2>
                        </div>
                        <p className={cx('tooltip-text')}>{msg}</p>
                        <div className={cx('tooltip-action')}>{btnRender()}</div>
                    </div>
                }
            >
                <Box>
                    <Box
                        ref={areaRef}
                        onMouseMove={handleMouseMove}
                        sx={{ width: { 0: '100%', 480: '480px', 720: '320px' }, margin: '0 auto' }}
                        className={cx('image')}
                    >
                        <img className={cx('img')} src={thumbUrl} alt={name} />
                    </Box>
                    <Action data={currentMovie} is18={is18} hasUser={hasUser} />
                </Box>
            </MyTooltip>
        ) : (
            <>
                <Box
                    sx={{ width: { 0: '100%', 480: '480px', 720: '320px' }, margin: '0 auto' }}
                    className={cx('image')}
                >
                    <img className={cx('img')} src={thumbUrl} alt={name} />
                </Box>
                <Action data={currentMovie} hasUser={hasUser} />
            </>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('path')}>
                    <div>Phim / {name || 'Đang cập nhật'}</div>
                </div>

                <div className={cx('info-wrapper')}>
                    <Box sx={{ width: 1, marginBottom: '20px' }}>
                        <Box display="grid" gridTemplateColumns="repeat(24, 1fr)" gap={2}>
                            <Box
                                sx={{
                                    gridColumn: {
                                        0: 'span 24',
                                        720: 'span 12',
                                        960: 'span 10',
                                        1280: 'span 9',
                                        1360: 'span 8',
                                        1480: 'span 7',
                                        1660: 'span 6',
                                    },
                                }}
                            >
                                <div className={cx('image-container')}>
                                    {showAction(is18, hasUser, fireStoreData?.currentUserData?.birthYear)}
                                </div>
                            </Box>
                            <Box
                                sx={{
                                    gridColumn: {
                                        0: 'span 12',
                                        720: 'span 12',
                                        960: 'span 14',
                                        1280: 'span 15',
                                        1360: 'span 16',
                                        1480: 'span 17',
                                        1660: 'span 18',
                                    },
                                    display: { 0: 'none', 720: 'block' },
                                }}
                            >
                                <Box className={cx('info')}>
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
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: { 0: 'block', 720: 'none' },
                            width: { 0: '100%', 480: '480px', 720: '320px' },
                            margin: '20px auto',
                            borderTop: '1px solid currentColor',
                            // borderBottom: '1px solid currentColor',
                            padding: '10px',
                        }}
                    >
                        <Box sx={{ height: 'auto', margin: '10px' }}>
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
                        </Box>
                    </Box>
                    <hr />

                    <div className={cx('desc')}>
                        <h3>Nội dung phim</h3>
                        <div className={cx('desc-content')}>{content}</div>
                        <h3>Poster</h3>
                        <div className={cx('poster')}>
                            {posterUrl?.length === 0 ? (
                                <Box
                                    sx={{
                                        paddingTop: '20%',
                                        fontSize: '6rem',
                                        textAlign: 'center',
                                        backgroundColor: '#333',
                                    }}
                                    className={cx('poster-img')}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            color: '#fff',
                                            display: 'block',
                                            overflowWrap: 'break-word',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Poster is updating
                                    </Typography>
                                </Box>
                            ) : (
                                <img className={cx('poster-img')} src={posterUrl} alt={name} />
                            )}
                        </div>
                    </div>

                    {slug && <Comments id={slug} />}
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
