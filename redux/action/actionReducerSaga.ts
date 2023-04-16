import ActionTypes from "./actionType";

export const doRequestGetUser = () => {
    return {
        type: ActionTypes.REQ_GET_USERS
    }
}

export const doGetUserResponse = (payload: any) => {
    return {
        type: ActionTypes.GET_USERS_RESPONSE,
        payload
    }
}

export const doAdd = (payload: any) => {
    return {
        type: ActionTypes.ADD_USER,
        payload
    }
}

export const doAddResponse = (payload: any) => {
    return {
        type: ActionTypes.ADD_USER_RESPONSE,
        payload
    }
}

export const doUpdate = (...payload: any) => {
    console.log(payload)
    return {
        type: ActionTypes.UPDATE_USER,
        payload
    }
}

export const doUpdateResponse = (payload: any) => {
    return {
        type: ActionTypes.UPDATE_USER_RESPONSE,
        payload
    }
}

export const doDelete = (payload: any) => {
    return {
        type: ActionTypes.DEL_USER,
        payload
    }
}

export const doDeleteResponse = (payload: any) => {
    return {
        type: ActionTypes.DEL_USER_RESPONSE,
        payload
    }
}


export const doGetUserId = (payload: any) => {
    return {
        type: ActionTypes.REQ_GET_ID,
        payload
    }
}
export const doGetUserIdRespons = (payload: any) => {
    return {
        type: ActionTypes.GET_ID_RESPONSE,
        payload
    }
}