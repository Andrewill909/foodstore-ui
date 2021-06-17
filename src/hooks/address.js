import * as React from 'react';
//API
import {getAddress} from '../api/address';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export function useAddressData(){
    let [data, setData] = React.useState([]);
    let [count, setCount] = React.useState(0);
    let [status, setStatus] = React.useState(statusList.idle);
    let [page, setPage] = React.useState(1);
    let [limit, setLimit] = React.useState(10);

    let fetchAddress = React.useCallback(async function(){
        setStatus(statusList.process);

        //req ke api
        let {data: {data, count, error}} = await getAddress({page,limit});

        if(error){
            setStatus(statusList.error);
            return;
        }

        //if no error
        setStatus(statusList.success);
        setData(data);
        setCount(count);
    }, [page, limit]);

    React.useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit
    }
}