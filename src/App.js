import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { PublicRoutes } from '_/pages/routes';
import Modal from './components/subUI/Modal/Modal';
import { selector } from './Hook/redux/selector';
import UseSnackbar from './Hook/Toats/UseSnackbar';
import { DefaultLayout } from './Layouts';

function App() {
    const showModal = useSelector(selector.showModal);
    const showNotif = useSelector(selector.showNotif);

    const { open, message, type, styleOveride } = showNotif;

    return (
        <Router>
            <div className="App">
                <UseSnackbar
                    message={message}
                    open={open}
                    placement="topCenter"
                    type={type}
                    styleOveride={{
                        ...styleOveride,
                        width: 'auto',
                        fontSize: '1.4rem',
                        marginTop: '5%',
                        alignItems: 'center',
                    }}
                />
                {showModal && <Modal />}
                <Routes>
                    {PublicRoutes.map((route, index) => {
                        const Page = route.comp;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
