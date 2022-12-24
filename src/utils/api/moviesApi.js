import axiosClient from './axiosClient';

function moviesApi(props) {
    if (typeof props === 'number') {
        const url = `/danh-sach/phim-moi-cap-nhat?page=${props}`;
        return axiosClient.get(url);
    } else if (typeof props === 'undefined' || props === null) {
        const url = `/danh-sach/phim-moi-cap-nhat`;
        return axiosClient.get(url);
    } else {
        const url = `/phim/${props}`;
        return axiosClient.get(url);
    }
}

export default moviesApi;
