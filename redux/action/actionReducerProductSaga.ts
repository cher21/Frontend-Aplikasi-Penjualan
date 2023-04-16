import ActionTypes from "./actionType";

export const doRequestGetProduct=()=>{
    return{
        type:ActionTypes.REQ_GET_PRODUCT
    }
}

export const doGetProductResponse=(payload: any)=>{
    return{
        type:ActionTypes.GET_PRODUCT_RESPONSE,
        payload
    }
}

export const doAdd=(payload: any)=>{
    return{
        type:ActionTypes.ADD_PRODUCT,
        payload
    }
}

export const doAddResponse=(payload: any)=>{
    return{
        type:ActionTypes.ADD_PRODUCT_RESPONSE,
        payload
    }
}

export const doUpdate=(...payload: any)=>{
    console.log(payload)
    return{
        type:ActionTypes.UPDATE_PRODUCT,
        payload
    }
}

export const doUpdateResponse=(payload: any)=>{
    return{
        type:ActionTypes.UPDATE_PRODUCT_RESPONSE,
        payload
    }
}

export const doDelete=(payload: any)=>{
    return{
        type:ActionTypes.DEL_PRODUCT,
        payload
    }
}

export const doDeleteResponse=(payload: any)=>{
    return{
        type:ActionTypes.DEL_PRODUCT_RESPONSE,
        payload
    }
}
