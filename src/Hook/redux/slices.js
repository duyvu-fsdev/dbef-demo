import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moviesApi from '_/utils/api/moviesApi';

///         overlay -------------------------

export const setOverlay = createAsyncThunk('overlay/setOverlay', async (params, thunkAPI) => {
    thunkAPI.dispatch(overlaySlice.actions.changeLog);
    return params;
});

export const overlaySlice = createSlice({
    name: 'overlay',
    initialState: {
        state: false,
    },
    reducers: {
        setOverlay: (state, action) => {
            state.state = action.payload.state;
            state.caption = action.payload.caption;
        },
    },
});

const { reducer: overlayReducer } = overlaySlice;
export { overlayReducer };

///         movies -------------------------

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (params) => {
    try {
        const res = await moviesApi(params);
        return res;
    } catch (error) {
        console.log('failed');
    }
});

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        current: {},
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [fetchMovies.pending]: (state) => {
            state.loading = true;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.current = action.error;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
            //payload == return of fetchMovies()
        },
    },
});
const { reducer: moviesReducer } = moviesSlice;
export { moviesReducer };

//

export function getAllUrlParams() {
    // get query string from url (optional) or window
    var queryString = window.location.pathname;

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof a[1] === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {
                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

///         changeForm -------------------------

export const changeForm = createAsyncThunk('changeLog/changeForm', async (params, thunkAPI) => {
    thunkAPI.dispatch(changeFormSlice.actions.changeLog);
    return params;
});

export const changeFormSlice = createSlice({
    name: 'changeForm',
    initialState: {
        state: { login: true, fogot: false, reg: false, edit: false },
    },
    reducers: {
        changeForm: (state, action) => {
            state.state = action.payload.state;
        },
    },
});

const { reducer: changeFormReducer } = changeFormSlice;
export { changeFormReducer };

///         showModal -------------------------

export const showModal = createAsyncThunk('changeLog/showModal', async (params, thunkAPI) => {
    thunkAPI.dispatch(showModalSlice.actions.changeLog);
    return params;
});

export const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        state: false,
    },
    reducers: {
        showModal: (state, action) => {
            state.state = action.payload.state;
        },
    },
});

const { reducer: showModalReducer } = showModalSlice;
export { showModalReducer };

///         showNotif -------------------------

export const showNotif = createAsyncThunk('changeLog/showNotif', async (params, thunkAPI) => {
    thunkAPI.dispatch(showNotifSlice.actions.changeLog);
    return params;
});

export const showNotifSlice = createSlice({
    name: 'showNotif',
    initialState: {
        state: { type: '', open: false, message: '', styleOveride: {} },
    },
    reducers: {
        showNotif: (state, action) => {
            state.state = action.payload.state;
        },
    },
});

const { reducer: showNotifReducer } = showNotifSlice;
export { showNotifReducer };

////////////////////////////$RECYCLE.BIN
