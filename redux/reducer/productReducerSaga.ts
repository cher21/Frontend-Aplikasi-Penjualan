import ActionTypes from "../action/actionType";

const initialState = {
    products: [],
    message: '',
    refresh: '',
};


function productReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.GET_PRODUCT_RESPONSE:
            return {state, products: payload, refresh: true};
        case ActionTypes.ADD_PRODUCT_RESPONSE:
            return {message: payload.message, refresh: false};
        case ActionTypes.UPDATE_PRODUCT_RESPONSE:
            return {message: payload.message, refresh: false};
        case ActionTypes.DEL_PRODUCT_RESPONSE:
            return {message: payload, refresh: false}
        default:
            return state
    }
}

export default productReducers