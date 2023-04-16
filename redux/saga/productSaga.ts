import { call, put } from 'redux-saga/effects';
import ApiMethodProduct from "../../api/apiMethodProduct";
import { doAddResponse, doDeleteResponse, doGetProductResponse, doUpdateResponse } from '../action/actionReducerProductSaga';

function* handleGetAllProduct() :any {
    try {
        const result = yield call(ApiMethodProduct.getAll);
        yield put(doGetProductResponse(result.data))
    }
    catch (error) {
        yield put(doGetProductResponse({ message: error }))
    }
}

function* handleAddProduct(action: any) :any {
    try {
        console.log(action.payload)
        const result = yield call(ApiMethodProduct.create, action.payload)
        yield put(doAddResponse(result.data))
    }
    catch (error) {
        yield put(doAddResponse({ message: error }))
    }
}

function* handleUpdateProduct(action: any) :any {
    try {
        console.log(action)
        const result = yield call(ApiMethodProduct.update, action.payload[0], action.payload[1])
        yield put(doUpdateResponse(result.data))
    }
    catch (error) {
        yield put(doUpdateResponse({ message: error }))
    }
}

function* handleDelProduct(action: any) :any {
    try {
        const result = yield call(ApiMethodProduct.remove, action.payload)
        yield put(doDeleteResponse(result.data))
    }
    catch (error) {
        yield put(doDeleteResponse({ error }))
    }
}

export { handleAddProduct, handleGetAllProduct, handleUpdateProduct, handleDelProduct }