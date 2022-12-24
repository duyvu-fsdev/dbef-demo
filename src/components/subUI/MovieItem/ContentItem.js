import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import SidebarPopper from '_/Popper/SidebarPopper';
import { useAuth } from '_/contexts/AuthContext';
import AddDocumentBtn from '../AddMovieBtn/AddMovieBtn';
import Button from '../Button/Button';
import DeleteDocumentBtn from '../DeleteDocumentBtn/DeleteDocumentBtn';
import styles from './MovieItem.module.scss';
const cx = classNames.bind(styles);
const LIBRARY_POPPER = [
    {
        title: 'Enjoy Your Saved Movies',
        text: 'Log in to see saved movies.',
    },
];

function ContentItem({ data, isWatchLater }) {
    const { uid } = useAuth();
    useEffect(() => {}, [data]);

    console.log({ isWatchLater });

    const { name, originName, slug, thumbUrl, posterUrl } = data;
    const dataDoc = { name, originName, slug, thumbUrl, uid: [uid], posterUrl, createdAt: serverTimestamp() };
    return (
        <div className={cx('item')}>
            <div className={cx('item-container')}>
                <Link className={cx('link')} to={`/phim&name=${slug}`}>
                    <div className={cx('image-container')}>
                        <div className={cx('image')}>
                            <img className={cx('thubm')} src={thumbUrl} alt={name} />
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>
                            <h4> {name} </h4>
                            <h5> ({originName}) </h5>
                        </div>
                    </div>
                </Link>
                <div className={cx('actions')}>
                    <Tooltip arrow title="Play">
                        <div className={cx('btn')}>
                            <Button to={`/xem-phim&name=${slug}&id=0&ep=1`} text>
                                <PlayArrowIcon />
                            </Button>
                        </div>
                    </Tooltip>
                    {isWatchLater ? (
                        <Tooltip arrow title="Remove from list">
                            <div className={cx('btn')}>
                                <DeleteDocumentBtn
                                    collectionName={'watch_later_list'}
                                    id={slug}
                                    className={cx('del-btn')}
                                    uid={uid}
                                >
                                    <RemoveIcon />
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
                                    className={cx('del-btn')}
                                    uid={uid}
                                >
                                    <BookmarkAddIcon />
                                </AddDocumentBtn>
                            </div>
                        </Tooltip>
                    ) : (
                        <SidebarPopper content={LIBRARY_POPPER}>
                            <div className={cx('btn')}>
                                <Button text className={cx('del-btn')}>
                                    <BookmarkAddIcon />
                                </Button>
                            </div>
                        </SidebarPopper>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContentItem;
