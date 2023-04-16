import { call, put } from "redux-saga/effects";
import Auth from "../../api/auth"
import { doGetLoginResponse, doGetLoginError, doGetLogoutResponse, doGetLogoutError } from "../action/actionLogin";

function* handleLogin(action:any) :any {
    try{
        const result = yield call(Auth.login, action.payload);
        console.log(result)
        localStorage.setItem('token',JSON.stringify(result.accessToken))
        yield put(doGetLoginResponse(result.accessToken));
    } catch (error) {
        yield put(doGetLoginError(alert('Username or Password incorect')));
    }
}

function* handleLogout() {
    try{
        Auth.logout();
        yield put(doGetLogoutResponse());
    } catch (error:any) {
        yield put(doGetLogoutError(error.message));
    }
}


export {handleLogin,handleLogout}