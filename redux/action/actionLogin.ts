import ActionTypes from "./actionType";

export const doRequestGetLogin=(payload: any)=>{
    console.log(payload)
    return{
        type:ActionTypes.REQ_GET_LOGIN,
        payload:payload
    }
}

export const doGetLoginResponse=(payload: any)=>{
    return{
        type:ActionTypes.GET_LOGIN_RESPONSE,
        payload
    }
}

export const doGetLoginError=(payload: any)=>{
    return{
        type:ActionTypes.GET_LOGIN_ERROR,
        payload
    }
}



export const doRequestLogout=()=>{
    return{
        type:ActionTypes.REQ_LOGOUT
    }
}

export const doGetLogoutResponse=()=>{
    return{
        type:ActionTypes.GET_LOGOUT_RESPONSE
    }
}

export const doGetLogoutError=(payload: any)=>{
    return{
        type:ActionTypes.GET_LOGOUT_ERROR,
        payload
    }
}