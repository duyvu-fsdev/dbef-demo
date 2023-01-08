import classNames from 'classnames/bind';
import { useEffect } from 'react';

import { MovieItem } from '_/components/subUI';
import { useAuth } from '_/contexts/AuthContext';
import { useFireStore } from '_/contexts/FireStoreContext';
import styles from './SubPages.module.scss';

const cx = classNames.bind(styles);

function WatchLater() {
    const { uid } = useAuth();
    const { fireStoreData } = useFireStore();

    useEffect(() => {
        // setDataDoc();
    }, [uid]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('children-content')}>
                    {fireStoreData?.watchLaterMovies?.length ? (
                        <MovieItem content={fireStoreData.watchLaterMovies} isWatchLater={true} />
                    ) : (
                        <h3>List emty</h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WatchLater;
