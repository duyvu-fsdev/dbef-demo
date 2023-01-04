import { Box } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import images from '_/assets/img';
import styles from './Banner.module.scss';
import SlideItem from './SlideItem';

const cx = classNames.bind(styles);

const SlideBaner = ({ content }) => {
    const { data } = content;
    const [useData, setUseData] = useState([]);
    const [index, setIndex] = useState(0);
    const [preIndex, setPreIndex] = useState();

    let totalItemSlide = Number(process.env.REACT_APP_NUMBER_OF_ITEMS_SLIDE_IN_BANNER);

    if (!totalItemSlide || totalItemSlide <= 0 || totalItemSlide >= data.length) {
        totalItemSlide = data.length - 1;
    }

    useEffect(() => {
        let dataReturn = [];

        data?.map((data) => {
            const imgBanner = () => {
                if (data === undefined) {
                    return { url: '', slug: '' };
                } else {
                    const { name, slug, posterUrl } = data;
                    if (posterUrl === '') {
                        return { url: images.noPoster, slug: data.slug, name: data.name };
                    } else {
                        return { url: posterUrl, slug: slug, name: name };
                    }
                }
            };
            const { url, slug, name } = imgBanner();
            return dataReturn.push({ url, slug, name });
        });

        setUseData(dataReturn.slice(0, totalItemSlide));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const a = useRef(0);
    const goToPrevious = () => {
        setPreIndex(a.current);

        if (a.current > 0 && a.current <= totalItemSlide - 1) {
            a.current = a.current - 1;
            setIndex(a.current);
        } else {
            a.current = totalItemSlide - 1;
            setIndex(totalItemSlide - 1);
        }
    };

    const goToNext = () => {
        setPreIndex(a.current);

        if (a.current >= 0 && a.current < totalItemSlide - 1) {
            a.current = a.current + 1;
            setIndex(a.current);
        } else {
            a.current = 0;
            setIndex(0);
        }
    };

    const goToSlide = (slideIndex) => {
        setPreIndex(a.current);
        setIndex(slideIndex);
        a.current = slideIndex;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPreIndex(a.current);
            if (a.current >= 0 && a.current < totalItemSlide - 1) {
                a.current = a.current + 1;
                setIndex(a.current);
            } else {
                a.current = 0;
                setIndex(0);
            }
        }, 7500);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preIndex, index, a]);

    useEffect(() => {
        const e = document.getElementsByClassName(`dot`);
        if (e.length === 0) {
            return;
        }
        document.getElementsByClassName(`dot-${index}`)[0].style.color = 'red';

        document.getElementsByClassName(`dot-${preIndex}`)[0].style.color = 'unset';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preIndex, index, a]);

    let slug, url, name;

    if (useData.length - 1 > 0) {
        slug = useData[index].slug;
        url = useData[index].url;
        name = useData[index].name;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner-container')}>
                <SlideItem slug={slug} url={url} name={name} />
                <Box sx={{ display: { 0: 'none', 720: 'block' } }} onClick={goToPrevious} className={cx('left-arrow')}>
                    ❰
                </Box>
                <Box sx={{ display: { 0: 'none', 720: 'block' } }} onClick={goToNext} className={cx('right-arrow')}>
                    ❱
                </Box>

                <div className={cx('dots-container')}>
                    {useData.map((slide, slideIndex) => (
                        <div
                            className={cx(`dot dot-${slideIndex}`)}
                            key={slideIndex}
                            onClick={(e) => goToSlide(slideIndex)}
                        >
                            ●
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideBaner;
