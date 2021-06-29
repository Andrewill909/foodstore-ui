import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
//ui
import {LayoutOne, Text, Table} from 'upkit';
import TopBar from '../../components/TopBar';
import { BounceLoader } from 'react-spinners';
//api
import { getInvoiceByOrderId } from '../../api/invoice';

export default function Invoice(){
    let [invoice, setInvoice] = React.useState(null);
    let [error, setError] = React.useState('');
    let [status, setStatus] = React.useState('process');

    let {params} = useRouteMatch();

    React.useEffect(() => {
        getInvoiceByOrderId(params?.order_id)
        .then(({data}) => {
            if(data?.error){
                setError(data.message || 'Terjadi kesalahan yang tidak diketahui');
            }
            setInvoice(data);
        })
        .finally(() => setStatus('idle'))
    }, [params]);

    if(error.length){
        return (
            <LayoutOne>
                <TopBar/>
                <Text as="h3">Terjadi kesalahan</Text>
                {error}
            </LayoutOne>
        )
    }

    if(status === 'process'){
        return (
            <LayoutOne>
                <div className="text-center py-10">
                    <div className="inline-block">
                        <BounceLoader color="red" />
                    </div>
                </div>
            </LayoutOne>
        )
    }

    return <div></div>
}