import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//import reducer
import authReducer from '../features/Auth/reducer';
import productsReducer from '../features/Products/reducer';

//hubungan dengan chrome devtools redux
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//gabungkan semua reducer
const rootReducers = combineReducers({
    auth: authReducer,
    products: productsReducer
});

//buat store
const store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
