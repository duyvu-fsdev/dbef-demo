import { Fragment } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from '_/pages/routes';
import { DefaultLayout } from './Layouts';

function App() {
    return (
        <Router>
            <div className="App">
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
