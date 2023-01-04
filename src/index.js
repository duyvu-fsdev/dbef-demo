import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import GlobalStyles from './assets/GlobalStyles';
import AuthContextProvider from './contexts/AuthContext';
import FireStoreContextProvider from './contexts/FireStoreContext';
import ThemeMuiContextProvider from './contexts/ThemeMuiContext';
import store from './Hook/redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //   <StrictMode>
    <ThemeMuiContextProvider>
        <CssBaseline />
        <GlobalStyles>
            <Provider store={store}>
                <AuthContextProvider>
                    <FireStoreContextProvider>
                        <App />
                    </FireStoreContextProvider>
                </AuthContextProvider>
            </Provider>
        </GlobalStyles>
    </ThemeMuiContextProvider>,
    //  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
