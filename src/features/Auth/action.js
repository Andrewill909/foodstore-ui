//import constant
import {USER_LOGIN, USER_LOGOUT} from './constant';

//TODO action userLogin
export function userLogin(user, token){
    return {
        type: USER_LOGIN,
        user,
        token
    };
}

//TODO action userLogout
export function userLogout(){
    return {type: USER_LOGOUT};
}