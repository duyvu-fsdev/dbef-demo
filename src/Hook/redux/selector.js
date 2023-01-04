function changeForm(state) {
    return state.changeForm.state;
}

function showModal(state) {
    return state.showModal.state;
}

function showNotif(state) {
    return state.showNotif.state;
}
function showLoading(state) {
    return state.showLoading.state;
}

function setOverlay(state) {
    return state.overlay.state;
}

function movies(state) {
    return state.movies.current;
}

export const selector = { movies, setOverlay, changeForm, showModal, showNotif, showLoading };
