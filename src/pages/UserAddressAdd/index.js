import * as React from 'react';
import { useHistory } from 'react-router-dom';
//form
import {rules} from './vaidation';
import {useForm} from 'react-hook-form';
//UI
import { LayoutOne, InputText, FormControl, Textarea, Button } from 'upkit';
//components
import TopBar from '../../components/TopBar';
import SelectWilayah from '../../components/SelectWilayah';
//api
import {createAddress} from '../../api/address';


export default function UserAddressAdd(){

    let history = useHistory();
    let {handleSubmit, register, setValue, getValues, watch, formState: {errors}} = useForm();

    let allFields = watch();

    React.useEffect(() => {
        register('provinsi', rules.provinsi);
        register('kabupaten', rules.kabupaten);
        register('kecamatan', rules.kecamatan);
        register('kelurahan', rules.kelurahan);
    }, [register]);

    React.useEffect(() => {
        setValue('kabupaten', null);
        setValue('kecamatan', null);
        setValue('kelurahan', null);
    }, [allFields.provinsi, setValue]);

    React.useEffect(() => {
        setValue('kecamatan', null);
        setValue('kelurahan', null);
    }, [allFields.kabupaten, setValue]);

    React.useEffect(() => {
        setValue('kelurahan', null);
    }, [allFields.kecamatan, setValue]);

    const updateValue = (field, value) => {
        setValue(field, value, {shouldDirty: true, shouldValidate: true});
    }

    const onSubmit = async (formData) => {
        
        let payload = {
            nama: formData.nama_alamat,
            detail: formData.detail_alamat,
            provinsi: formData.provinsi.label,
            kabupaten: formData.kabupaten.label,
            kecamatan: formData.kecamatan.label,
            kelurahan: formData.kelurahan.label,
        }

        let {data} = await createAddress(payload);
        if(data.error) return;

        history.push('/alamat-pengiriman');
    }

    return (
        <LayoutOne>
            <TopBar/>
            <br/>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl label="Nama Alamat" errorMessage={errors.nama_alamat?.message} color="black">
                        <InputText
                            placeholder="Nama Alamat"
                            fitContainer
                            {...register('nama_alamat', rules.nama_alamat)}
                        />
                    </FormControl>

                    <FormControl label="Provinsi" errorMessage={errors.provinsi?.message} color="black">
                        <SelectWilayah
                            onChange={option => updateValue('provinsi', option)}
                            tingkat="provinsi"
                            value={getValues().provinsi}
                        />
                    </FormControl>

                    <FormControl label="Kabupaten/kota" errorMessage={errors.kabupaten?.message} color="black">
                        <SelectWilayah
                            onChange={option => updateValue('kabupaten', option)}
                            kodeInduk={getValues().provinsi?.value}
                            tingkat="kabupaten"
                            value={getValues().kabupaten}
                        />
                    </FormControl>

                    <FormControl label="Kecamatan" errorMessage={errors.kecamatan?.message} color="black">
                        <SelectWilayah
                            onChange={option => updateValue('kecamatan', option)}
                            kodeInduk={getValues().kabupaten?.value}
                            tingkat="kecamatan"
                            value={getValues().kecamatan}
                        />
                    </FormControl>

                    <FormControl label="Kelurahan" errorMessage={errors.kelurahan?.message} color="black">
                        <SelectWilayah
                            onChange={option => updateValue('kelurahan', option)}
                            kodeInduk={getValues().kecamatan?.value}
                            tingkat="desa"
                            value={getValues().kelurahan}
                        />
                    </FormControl>

                    <FormControl label="Detail Alamat" errorMessage={errors.detail_alamat?.message} color="black">
                        <Textarea
                            placeholder="Detail alamat"
                            fitContainer
                            {...register('detail_alamat', rules.detail_alamat)}
                        />
                    </FormControl>

                    <Button fitContainer>
                        Simpan
                    </Button>
                </form>
            </div>
        </LayoutOne>
    )
}