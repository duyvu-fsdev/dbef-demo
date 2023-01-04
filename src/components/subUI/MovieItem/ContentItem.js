import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MyTooltip } from '_/components/CustomComponents/CustomComponents';
import { useAuth } from '_/contexts/AuthContext';
import AddDocumentBtn from '../AddMovieBtn/AddMovieBtn';
import Button from '../Button/Button';
import DeleteDocumentBtn from '../DeleteDocumentBtn/DeleteDocumentBtn';
import LoginBtn from '../LoginBtn/LoginBtn';
import styles from './MovieItem.module.scss';

const cx = classNames.bind(styles);

function ContentItem({ data, isWatchLater }) {
    const { uid } = useAuth();
    useEffect(() => {}, [data]);

    const { name, originName, slug, thumbUrl, posterUrl } = data;
    const dataDoc = { name, originName, slug, thumbUrl, uid: [uid], posterUrl, createdAt: serverTimestamp() };

    return (
        <div className={cx('item')}>
            <div className={cx('item-container')}>
                <Link className={cx('link')} to={`/dbef-demo/phim&name=${slug}`}>
                    <div className={cx('image-container')}>
                        <div className={cx('image')}>
                            <img className={cx('thubm')} src={thumbUrl} alt={name} />
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>
                            <Typography variant="h5" fontWeight={700}>
                                {' '}
                                {name}
                            </Typography>
                            <Typography variant="h6">{originName}</Typography>
                        </div>
                    </div>
                </Link>
                <div className={cx('actions')}>
                    <Tooltip arrow title="Play">
                        <div className={cx('btn')}>
                            <Button to={`/dbef-demo/xem-phim&name=${slug}&id=0&ep=1`} text>
                                <PlayArrowIcon sx={{ fontSize: '2rem' }} />
                            </Button>
                        </div>
                    </Tooltip>
                    {isWatchLater ? (
                        <Tooltip arrow title="Remove from list">
                            <div className={cx('btn')}>
                                <DeleteDocumentBtn
                                    collectionName={'watch_later_list'}
                                    id={slug}
                                    className={cx('action-btn')}
                                    uid={uid}
                                >
                                    <RemoveIcon sx={{ fontSize: '2rem' }} />
                                </DeleteDocumentBtn>
                            </div>
                        </Tooltip>
                    ) : uid ? (
                        <Tooltip arrow title="Watch later">
                            <div className={cx('btn')}>
                                <AddDocumentBtn
                                    dataDoc={dataDoc}
                                    collectionName={'watch_later_list'}
                                    id={slug}
                                    className={cx('action-btn')}
                                    uid={uid}
                                >
                                    <BookmarkAddIcon sx={{ fontSize: '2rem' }} />
                                </AddDocumentBtn>
                            </div>
                        </Tooltip>
                    ) : (
                        <MyTooltip
                            placement="bottom"
                            arrow
                            title={
                                <div className={cx('tooltip-content')}>
                                    <div className={cx('tooltip-title')}>
                                        <h2>Enjoy Your Saved Movies</h2>
                                    </div>
                                    <p className={cx('tooltip-text')}>Log in to see saved movies.</p>
                                    <div className={cx('tooltip-action')}>
                                        {' '}
                                        <LoginBtn primary scale className={cx('log-in')}>
                                            Log in
                                        </LoginBtn>
                                    </div>
                                </div>
                            }
                        >
                            <div className={cx('btn')}>
                                <Button disable text className={cx('action-btn')}>
                                    <BookmarkAddIcon sx={{ fontSize: '2rem' }} />
                                </Button>
                            </div>
                        </MyTooltip>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContentItem;
