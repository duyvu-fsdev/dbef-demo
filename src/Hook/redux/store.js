import { configureStore } from '@reduxjs/toolkit';
import {
    overlayReducer,
    moviesReducer,
    changeFormReducer,
    showModalReducer,
    showNotifReducer,
    showLoadingReducer,
} from './slices';

const rootReducer = {
    movies: moviesReducer,
    overlay: overlayReducer,
    changeForm: changeFormReducer,
    showModal: showModalReducer,
    showNotif: showNotifReducer,
    showLoading: showLoadingReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
