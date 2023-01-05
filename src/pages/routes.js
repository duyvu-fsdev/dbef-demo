import { SearchLayout } from '_/Layouts';
import { Home, ListUpdate, MovieDetails, Play, Search, NotFoundPage, Profile, WatchLater } from '_/pages';

const routes = {
    home: '/dbef-demo',
    search: '/dbef-demo/search',
    phim: '/dbef-demo/phim&name=:any',
    play: '/dbef-demo/xem-phim&name=:any&id=:any&ep=:any',
    list: '/dbef-demo/danh-sach/phim-moi-cap-nhat&:id',
    profile: '/dbef-demo/profile',
    watchLater: '/dbef-demo/watchLater',
    notfoundpage: '/dbef-demo/*',
};

const PublicRoutes = [
    { path: routes.home, comp: Home },
    { path: routes.search, comp: Search, layout: SearchLayout },
    { path: routes.phim, comp: MovieDetails },
    { path: routes.play, comp: Play },
    { path: routes.list, comp: ListUpdate },
    { path: routes.notfoundpage, comp: NotFoundPage },
    { path: routes.profile, comp: Profile },
    { path: routes.watchLater, comp: WatchLater },
];

const PrivateRoutes = [];

export { PrivateRoutes, PublicRoutes, routes };
