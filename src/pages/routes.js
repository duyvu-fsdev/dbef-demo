import { Home, ListUpdate, MovieDetails, Play, Search, NotFoundPage, Profile, WatchLater } from '_/pages';

const routes = {
    home: '/',
    search: '/search',
    phim: '/phim&name=:any',
    play: '/xem-phim&name=:any&id=:any&ep=:any',
    list: '/danh-sach/phim-moi-cap-nhat&:id',
    profile: '/profile',
    watchLater: '/watchLater',
    notfoundpage: '*',
};

const PublicRoutes = [
    { path: routes.home, comp: Home },
    { path: routes.search, comp: Search },
    { path: routes.phim, comp: MovieDetails },
    { path: routes.play, comp: Play },
    { path: routes.list, comp: ListUpdate },
    { path: routes.notfoundpage, comp: NotFoundPage },
    { path: routes.profile, comp: Profile },
    { path: routes.watchLater, comp: WatchLater },
];

const PrivateRoutes = [];

export { PrivateRoutes, PublicRoutes, routes };
