import { call, put } from 'redux-saga/effects';
import ApiMethod from "../../api/apiMethod";
import { doAddResponse, doDeleteResponse, doGetUserIdRespons, doGetUserResponse, doUpdateResponse } from '../action/actionReducerSaga';

function* handleGetAllUser() : any {
    try {
        const result = yield call(ApiMethod.getAll);
        yield put(doGetUserResponse(result.data))
    }
    catch (error) {
        yield put(doGetUserResponse({ message: error }))
    }
}

function* handleAddUser(action: any) :any {
    try {
        const result = yield call(ApiMethod.create, action.payload)
        yield put(doAddResponse(result.data))
    }
    catch (error) {
        yield put(doAddResponse({ message: error }))
    }
}

function* handleUpdateUser(action: any) :any {
    try {
        console.log(action)
        const result = yield call(ApiMethod.update, action.payload[0], action.payload[1])
        yield put(doUpdateResponse(result.data))
    }
    catch (error) {
        yield put(doUpdateResponse({ message: error }))
    }
}

function* handleDelUser(action: any) :any {
    try {
        const result = yield call(ApiMethod.remove, action.payload)
        yield put(doDeleteResponse(result.data))
    }
    catch (error) {
        yield put(doDeleteResponse({ error }))
    }
}

function* handleGetId(action: any) :any {
    try {
        const result = yield call(ApiMethod.search, action.payload)
        yield put(doGetUserIdRespons(result.data))
    }
    catch (error) {
        yield put(doGetUserIdRespons({error}))
    }
}

export { handleAddUser, handleGetAllUser, handleUpdateUser, handleDelUser, handleGetId }