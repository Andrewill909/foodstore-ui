import store from './store';
import {saveCart} from '../api/cart';

let currentAuth;
let currentCart;    

function listener(){

    let previousAuth = currentAuth;
    let previousCart = currentCart;

    //TODO update current auth terlepas dari adanya update/tidak
    currentAuth = store.getState().auth;
    currentCart = store.getState().cart;

    let {token} = currentAuth;

    if(currentAuth !== previousAuth){
        localStorage.setItem('auth', JSON.stringify(currentAuth));

        saveCart(token, currentCart);
    }

    if(currentCart !== previousCart){
        localStorage.setItem('cart', JSON.stringify(currentCart));

        saveCart(token, currentCart);

    }
}

function listen(){
    store.subscribe(listener);
}

export {listen};