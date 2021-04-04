function reducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, open: true };
        case 'CLOSE_MODAL':
            return { ...state, open: false };
        default:
            throw new Error();
    }
}

export default reducer;