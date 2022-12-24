import { serverTimestamp } from '@firebase/firestore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ClickAwayListener, Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';

import { Button } from '_/components/subUI';
import AddDocumentBtn from '_/components/subUI/AddMovieBtn/AddMovieBtn';
import { showNotifSlice } from '_/Hook/redux/slices';
import { useAuth } from '_/contexts/AuthContext';
import styles from './MovieDetails.module.scss';

const cx = classNames.bind(styles);

Action.propTypes = {};

function Action(props) {
    const dispatch = useDispatch();
    const { uid } = useAuth();
    const [dataDoc, setDataDoc] = useState();

    const { data, is18 } = props;

    let styles = {};

    if (is18) {
        styles = {
            pointerEvents: 'none',
            opacity: 0.8,
        };
    } else {
        styles = {
            pointerEvents: 'fill',
            opacity: 1,
        };
    }

    const handleShowSnackbar = (state) => {
        dispatch(
            showNotifSlice.actions.showNotif({
                state: state,
            }),
        );
    };

    const handleHideSnackbar = () => {
        setTimeout(function () {
            dispatch(
                showNotifSlice.actions.showNotif({
                    state: { open: false, message: '', type: '' },
                }),
            );
        }, 2000);
    };

    //tooltip

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    ///
    const { name, originName, slug, posterUrl, thumbUrl } = data;
    useEffect(() => {
        /// addDoc
        if (!uid) {
            return;
        }
        setDataDoc({ name, originName, slug, thumbUrl, posterUrl, createdAt: serverTimestamp(), uid: [uid] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, data]);

    return (
        <div
            className={cx('action')}
            style={{
                '--pointer-events': `${styles.pointerEvents}`,
                '--opacity': `${styles.opacity}`,
            }}
        >
            <Button text to={`/xem-phim&name=${slug}&id=0&ep=1`} className={cx('play-btn')}>
                Play
            </Button>

            <AddDocumentBtn
                collectionName="watch_later_list"
                className={cx('add-btn')}
                dataDoc={dataDoc}
                id={slug}
                uid={uid}
            >
                Add to Watch Later
            </AddDocumentBtn>

            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    arrow
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <div className={cx('share-wraper')}>
                            <FacebookShareButton
                                className={cx('share-block')}
                                url={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`}
                            >
                                <div className={cx('share-item')}>
                                    <FacebookIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Facebook</p>
                                </div>
                            </FacebookShareButton>

                            <FacebookMessengerShareButton
                                className={cx('share-block')}
                                url={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`}
                            >
                                <div className={cx('share-item')}>
                                    <FacebookMessengerIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Messenger</p>
                                </div>
                            </FacebookMessengerShareButton>
                            <TwitterShareButton
                                className={cx('share-block')}
                                url={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`}
                            >
                                <div className={cx('share-item')}>
                                    <TwitterIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Twitter</p>
                                </div>
                            </TwitterShareButton>
                            <TelegramShareButton
                                className={cx('share-block')}
                                url={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`}
                            >
                                <div className={cx('share-item')}>
                                    <TelegramIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Telegram</p>
                                </div>
                            </TelegramShareButton>
                            <EmailShareButton
                                className={cx('share-block')}
                                url={`${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`}
                            >
                                <div className={cx('share-item')}>
                                    <EmailIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Email</p>
                                </div>
                            </EmailShareButton>

                            <Button
                                className={cx('share-block')}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `${process.env.REACT_APP_BASE_URL_ENDPOINT}/xem-phim&name=${data.slug}&id=0&ep=1`,
                                    );

                                    handleShowSnackbar({
                                        type: 'success',
                                        open: true,
                                        message: 'Copied',
                                    });
                                    handleHideSnackbar();
                                }}
                            >
                                <div className={cx('share-item')}>
                                    <ContentCopyIcon className={cx('share-icon')} />
                                    <p className={cx('share-title')}>Copy Link</p>
                                </div>
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <Button onClick={handleTooltipOpen} text className={cx('share-btn')}>
                            share
                        </Button>
                    </div>
                </Tooltip>
            </ClickAwayListener>
        </div>
    );
}

export default Action;
