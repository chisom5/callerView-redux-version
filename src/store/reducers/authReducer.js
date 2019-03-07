import type from '../types';

const { ADMIN_LOGIN } = type;

const initialState = {
    users: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN:
            return {
                ...state,
                users: action.payload,
            }

        default:
            return state;
    }
}

export default authReducer;