import classNames from 'classnames/bind';

// import AddIcon from '@mui/icons-material/Add';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ReactComponent as Facebook } from '_/assets/img/facebook.svg';
import { Button } from '_/components/subUI';
import LoginBtn from '_/components/subUI/LoginBtn/LoginBtn';
import { useAuth } from '_/contexts/AuthContext';
import { routes } from '_/pages/routes';

import { Box, Tooltip } from '@mui/material';
import styles from './Sidebar.module.scss';
import { MyTooltip } from '_/components/CustomComponents/CustomComponents';

const cx = classNames.bind(styles);

// const CREATE_PLAYLIST_POPPER = [
//     {
//         title: 'Create a playlist',
//         text: 'Log in to create and share playlists..',
//     },
// ];
// const LIKED_MOVIES_POPPER = [
//     {
//         title: 'Enjoy your Liked Movies',
//         text: 'Log in to see all the movies you’ve liked in one easy playlist.',
//     },
// ];

function Sidebar() {
    const { currentUser } = useAuth();

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('container')}>
                <Box sx={{ width: { 0: '40px', 1280: '212px' } }}>
                    <div className={cx('sidebar-block')}>
                        <Button text className={cx('sidebar-btn')} to={routes.home}>
                            <Tooltip title="Home" arrow placement="right-start">
                                <Box sx={{ display: { 0: 'flex', 1280: 'none' } }}>
                                    <HomeIcon className={cx('icon')} />
                                </Box>
                            </Tooltip>
                            <Box sx={{ display: { 0: 'none', 1280: 'flex' } }}>
                                <HomeIcon className={cx('icon')} />
                                <Box sx={{ marginLeft: '10px' }}> Home</Box>
                            </Box>
                        </Button>

                        <Button text className={cx('sidebar-btn')} to={routes.search}>
                            <Tooltip title="Search" arrow placement="right-start">
                                <Box sx={{ display: { 0: 'flex', 1280: 'none' } }}>
                                    <SearchIcon className={cx('icon')} />
                                </Box>
                            </Tooltip>
                            <Box sx={{ display: { 0: 'none', 1280: 'flex' } }}>
                                <SearchIcon className={cx('icon')} />
                                <Box sx={{ marginLeft: '10px' }}>Search</Box>
                            </Box>
                        </Button>
                    </div>

                    {!(currentUser !== null) && (
                        <>
                            <Box sx={{ display: { 0: 'none', 1280: 'flex' } }} className={cx('login-btn')}>
                                <LoginBtn outline>
                                    <Box sx={{ display: 'block' }}>Log in</Box>
                                </LoginBtn>
                            </Box>
                            <Box sx={{ display: { 0: 'flex', 1280: 'none' } }} className={cx('login-btn')}>
                                <Tooltip title="log in" arrow placement="right-start">
                                    <div>
                                        <LoginBtn outline>
                                            <LoginIcon className={cx('icon')} />
                                        </LoginBtn>
                                    </div>
                                </Tooltip>
                            </Box>
                        </>
                    )}
                    <div className={cx('sidebar-block')}>
                        {currentUser !== null ? (
                            <>
                                <Button to="/watchLater" text className={cx('sidebar-btn')}>
                                    <Tooltip title="Watch later" arrow placement="right-start">
                                        <Box sx={{ display: { 0: 'flex', 1280: 'none' } }}>
                                            <AccessTimeIcon className={cx('icon')} />
                                        </Box>
                                    </Tooltip>
                                    <Box sx={{ display: { 0: 'none', 1280: 'flex' } }}>
                                        <AccessTimeIcon className={cx('icon')} />
                                        <Box sx={{ marginLeft: '10px' }}> Watch later</Box>
                                    </Box>
                                </Button>

                                {/* <Button to="createplaylist" text className={cx('sidebar-btn')}>
                                    
                                        {uiWidth < 1404 ? (
                                            <Tooltip title="Create Playlist" arrow placement="right-start">
                                                <AddIcon />
                                            </Tooltip>
                                        ) : (
                                            <>
                                                <AddIcon /> <p> Create Playlist</p>
                                            </>
                                        )}
                                    </div>
                                </Button> */}

                                {/* <Button to="/likedmovies" text className={cx('sidebar-btn')}>
                                    
                                        {uiWidth < 1404 ? (
                                            <Tooltip title="Liked Movies" arrow placement="right-start">
                                                <FavoriteIcon />
                                            </Tooltip>
                                        ) : (
                                            <>
                                                <FavoriteIcon /> <p>Liked Movies</p>
                                            </>
                                        )}
                                    </div>
                                </Button> */}
                            </>
                        ) : (
                            <>
                                <div>
                                    <MyTooltip
                                        placement="right"
                                        arrow
                                        title={
                                            <div className={cx('tooltip-content')}>
                                                <div className={cx('tooltip-title')}>
                                                    <h2>Enjoy Your Saved Movies</h2>
                                                </div>
                                                <p className={cx('tooltip-text')}>
                                                    Log in to see all the movies you’ve liked in one easy playlist.
                                                </p>
                                                <div className={cx('tooltip-action')}>
                                                    {' '}
                                                    <LoginBtn primary scale className={cx('log-in')}>
                                                        Log in
                                                    </LoginBtn>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <div>
                                            <Button text className={cx('sidebar-btn')}>
                                                <Box sx={{ display: { 0: 'flex', 1280: 'none' } }}>
                                                    <AccessTimeIcon className={cx('icon')} />
                                                </Box>
                                                <Box sx={{ display: { 0: 'none', 1280: 'flex' } }}>
                                                    <AccessTimeIcon className={cx('icon')} />
                                                    <Box sx={{ marginLeft: '10px' }}> Watch later</Box>
                                                </Box>
                                            </Button>
                                        </div>
                                    </MyTooltip>
                                </div>

                                {/* <div>
                                    <SidebarPopper content={CREATE_PLAYLIST_POPPER}>
                                        <div>
                                            <Button text className={cx('sidebar-btn')}>
                                                
                                                    {<AddIcon />}
                                                    {uiWidth >= 1404 && <p>Create Playlist</p>}
                                                </div>
                                            </Button>
                                        </div>
                                    </SidebarPopper>
                                </div> */}
                                {/* <div>
                                    <SidebarPopper content={LIKED_MOVIES_POPPER}>
                                        <div>
                                            <Button text className={cx('sidebar-btn')}>
                                                
                                                    {' '}
                                                    {<FavoriteIcon />}
                                                    {uiWidth >= 1404 && <p>Liked Movies</p>}
                                                </div>
                                            </Button>
                                        </div>
                                    </SidebarPopper>
                                </div> */}
                            </>
                        )}
                    </div>

                    <div className={cx('social')}>
                        <div className={cx('icons')}>
                            <Button href="https://www.facebook.com/vqduydz" className={cx('icon')}>
                                {<Facebook />}
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </aside>
    );
}
export default Sidebar;
