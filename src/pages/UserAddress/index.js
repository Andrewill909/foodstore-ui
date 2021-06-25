import * as React from 'react';
//UI lib
import { LayoutOne, Text, Table, Button } from 'upkit';
import {Link} from 'react-router-dom';
//component
import TopBar from '../../components/TopBar';
//hooks
import { useAddressData } from '../../hooks/address';


export default function UserAddress(){

    let {data, limit, page, status, count, setPage} = useAddressData();
    const columns = [
        {Header: 'Nama', accessor: 'nama'},
        {Header: 'Detail', accessor: alamat => {
            return <div>
                {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan}
                <br/>
                {alamat.detail}
            </div>
        }}
    ]
    
    return(
        <LayoutOne size="large">
            <div>
                <TopBar/>
                <Text as="h3">Alamat Pengiriman</Text>
                <br/>

                <Link to="alamat-pengiriman/tambah">
                    <Button>
                        Tambah Baru
                    </Button>
                </Link>
                <br/>
                <br/>
                <Table
                    items={data}
                    columns={columns}
                    totalItems={count}
                    page={page}
                    isLoading={status === 'process'}
                    perPage={limit}
                    onPageChange={page => setPage(page)}
                />

                {status === 'success' && !data.length ? 
                <div className="text-center p-10">
                    Kamu belum menambahkan alamat pengiriman.
                    <br/>
                    <Link to="alamat-pengiriman/tambah">
                        <button>Tambah Baru</button>
                    </Link>
                </div> : null}
            </div>
        </LayoutOne>
    )
}