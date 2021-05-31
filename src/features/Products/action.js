//import constants
import {START_FETCHING_PRODUCT, ERROR_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, SET_PAGE,SET_CATEGORY,
    SET_KEYWORD, SET_TAGS, NEXT_PAGE, PREV_PAGE, TOGGLE_TAG} from './constant';

//import api
import {getProducts} from '../../api/products';
//debounce
import debounce from 'debounce-promise';

let debouncedFetchProducts = debounce(getProducts, 1000);

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {

            dispatch(startFetchingProduct());

            //configure params
            let perPage = getState().products.perPage || 9;
            let currentPage = getState().products.currentPage || 1;
            let tags = getState().products.tags || [];
            let keyword = getState().products.keyword || '';
            let category = getState().products.category || '';

            const params = {
                limit: perPage,
                skip: (currentPage * perPage) - perPage,
                q: keyword,
                tags,
                category
            }

            let {data: {data, count}} = await debouncedFetchProducts(params);

            dispatch(successFetchingProduct({data, count}));
        } catch (error) {

            dispatch(errorFetchingProduct);
        }
    }
}

export const startFetchingProduct = () => {
    return {
        type: START_FETCHING_PRODUCT
    }
}

export const errorFetchingProduct = () => {
    return {
        type: ERROR_FETCHING_PRODUCT
    }
}

export const successFetchingProduct = ({data, count}) => {
    return {
        type: SUCCESS_FETCHING_PRODUCT,
        data,
        count
    }
}