export const initialState = {
    id: '',
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'setUser':
            return { ...state, id: 1 };
        break;
        default:
            return state;
    }
}