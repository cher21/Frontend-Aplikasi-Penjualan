import ActionTypes from "../action/actionType";

const initialState = {
    login: '',
    message: '',
    refresh: '',
    error: ''
}

function loginReducers(state = initialState, action:any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.GET_LOGIN_RESPONSE:
            if (payload.accessToken) {
                return {...state, login: payload.accessToken, refresh: true};
            } else {
                return state;
            }
        case ActionTypes.GET_LOGIN_ERROR:
            return{state, error: payload}
           
        //LOGOUT
        case ActionTypes.GET_LOGOUT_RESPONSE:
            return {...state, login: '', refresh: true};
        case ActionTypes.GET_LOGOUT_ERROR:
            return{state, error: payload}  
        default:
            return state
    }
}

export default loginReducers