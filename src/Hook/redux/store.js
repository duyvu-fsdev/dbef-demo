import { configureStore } from '@reduxjs/toolkit';
import { overlayReducer, moviesReducer, changeFormReducer, showModalReducer, showNotifReducer } from './slices';

const rootReducer = {
    movies: moviesReducer,
    overlay: overlayReducer,
    changeForm: changeFormReducer,
    showModal: showModalReducer,
    showNotif: showNotifReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
