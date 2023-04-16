import ActionTypes from "../action/actionType";

const initialState = {
    users: [],
    message: '',
    refresh: '',
};


function userReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.GET_USERS_RESPONSE:
            return {state, users: payload, refresh: true};
        case ActionTypes.ADD_USER_RESPONSE:
            return {message: payload.message, refresh: false};
        case ActionTypes.UPDATE_USER_RESPONSE:
            return {message: payload.message, refresh: false};
        case ActionTypes.DEL_USER_RESPONSE:
            return {message: payload, refresh: false};

        case ActionTypes.GET_ID_RESPONSE:
            return {message: payload.message,  refresh: true};

        default:
            return state
    }
}

export default userReducers