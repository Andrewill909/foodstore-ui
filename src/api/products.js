import axios from 'axios';
import {config} from '../config';

export  function getProducts(params){

    return  axios.get(`${config.api_host}/api/products`, {
        params
    })
}