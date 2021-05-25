import store from './store';

let currentAuth;

function listener(){

    let previousAuth = currentAuth;
    //TODO update current auth terlepas dari adanya update/tidak
    currentAuth = store.getState().auth;

    //cek apakah adanya perubahan nilai auth, bisa di compare karena merupakan string JSON
    if(currentAuth !== previousAuth){
        localStorage.setItem('auth', JSON.stringify(currentAuth));
    }
}

function listen(){
    store.subscribe(listener);
}

export {listen};