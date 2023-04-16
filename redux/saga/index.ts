import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from "../action/actionType";
import { handleAddUser, handleDelUser, handleGetAllUser, handleGetId, handleUpdateUser } from './userSaga';
import { handleAddProduct, handleDelProduct, handleGetAllProduct, handleUpdateProduct } from './productSaga';
import { handleLogin, handleLogout } from './loginSaga';


function* watchAll(){
    yield all([
        takeEvery(ActionTypes.REQ_GET_USERS,handleGetAllUser),
        takeEvery(ActionTypes.ADD_USER,handleAddUser),
        takeEvery(ActionTypes.UPDATE_USER,handleUpdateUser),
        takeEvery(ActionTypes.DEL_USER,handleDelUser),

        takeEvery(ActionTypes.REQ_GET_PRODUCT,handleGetAllProduct),
        takeEvery(ActionTypes.ADD_PRODUCT,handleAddProduct),
        takeEvery(ActionTypes.UPDATE_PRODUCT,handleUpdateProduct),
        takeEvery(ActionTypes.DEL_PRODUCT,handleDelProduct),

        takeEvery(ActionTypes.REQ_GET_LOGIN,handleLogin),
        takeEvery(ActionTypes.REQ_LOGOUT,handleLogout),
        takeEvery(ActionTypes.REQ_GET_ID,handleGetId)

    ])
}

export default watchAll;