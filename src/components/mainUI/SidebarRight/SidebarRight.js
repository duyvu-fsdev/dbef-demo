import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import DateTime from '_/components/subUI/DateTime/DateTime';

import styles from './SidebarRight.module.scss';
const cx = classNames.bind(styles);
SidebarRight.propTypes = {};

function SidebarRight(props) {
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        (async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            if (!lat || !long) return;

            await fetch(
                `${process.env.REACT_APP_WEATHET_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_WEATHET_API_KEY}`,
            )
                .then((res) => res.json())
                .then((result) => {
                    const { name, main, sys, weather } = result;

                    if (result.cod === '400') return;

                    setWeatherData({
                        name,
                        temp: ((main.temp - 32) * 5) / 9,
                        sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString('en-IN'),
                        sunset: new Date(sys.sunset * 1000).toLocaleTimeString('en-IN'),
                        weather: weather[0],
                        humidity: main.humidity,
                        country: sys.country,
                    });
                });
        })();
    }, [lat, long]);
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('sidebar-block')}>
                        <DateTime />
                    </div>
                    {weatherData.weather ? (
                        <div className={cx('weather')}>
                            <h4 className={cx('header')}>{weatherData.name + ' , ' + weatherData.country}</h4>

                            <div className={cx('body')}>
                                <p> {Math.floor(weatherData.temp)} &deg;C</p>
                                <img
                                    src={`${process.env.REACT_APP_WEATHET_ICON_URL}/${weatherData.weather.icon}.png`}
                                    alt=""
                                />
                            </div>
                            <p>{weatherData.weather.description}</p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default SidebarRight;
