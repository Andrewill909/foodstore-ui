//import constants
import {START_FETCHING_PRODUCT, ERROR_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, SET_PAGE,SET_CATEGORY,
SET_KEYWORD, SET_TAGS, NEXT_PAGE, PREV_PAGE, TOGGLE_TAG} from './constant';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}
const initialState = {
    data: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 6,
    keyword: '',
    category: '',
    tags: [],
    status: statusList.idle
};


export default function reducer(state = initialState, action) {

    switch (action.type) {
        
        case START_FETCHING_PRODUCT:
            return {...state, status: statusList.process};

        case ERROR_FETCHING_PRODUCT:
            return {...state, status: statusList.error};

        case SUCCESS_FETCHING_PRODUCT:
            return {...state, status: statusList.success, data: action.data, totalItems: action.count};
    
        default:
            return state;
    }
}