import * as React from 'react';
import {LayoutOne, Card, FormControl, InputText, InputPassword, Button} from 'upkit';
import {useHistory, Link} from 'react-router-dom';

import {useForm} from 'react-hook-form';

import {rules} from './validation';
import {register_user} from '../../api/auth';

//component
import StoreLogo from '../../components/StoreLogo';

//TODO tracking status
const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Register(){

    let {register, handleSubmit, formState: {errors}, setError} = useForm({mode: 'all'});

    let [status, setStatus] = React.useState(statusList.idle);

    let history = useHistory();

    const onSubmit =  async (formData) => {

        //cek kesamaan password
        let {password, password_confirmation} = formData;

        if(password !== password_confirmation){
            return setError('password_confirmation', {type: 'equality', message: 'Konfirmasi password harus sama dengan password'})
        }

        setStatus(statusList.process);
        
        let resp = await register_user(formData);
        // console.log(resp);

        if(resp.data.error){
            let fields = Object.keys(resp.data.fields);

            fields.forEach(field => {
                setError(field, {type: 'server', message: resp.data.fields[field]?.properties?.message});
            })

            setStatus(statusList.error);
            return;
        }

        setStatus(statusList.success);

        history.push('/register/berhasil');
    }

    return(
        <LayoutOne size="small">
            <Card color="white">

                <div className="text-center mb-5">
                    <StoreLogo />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl errorMessage={errors.full_name?.message}>
                        <InputText 
                            name="full_name"
                            placeholder="Nama Lengkap"
                            fitContainer
                            {...register("full_name", rules.full_name)}
                            // ref={register}
                        />
                    </FormControl>
                        
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText
                            name="email"
                            placeholder="Email"
                            fitContainer
                            {...register("email", rules.email)}
                            
                        />
                    </FormControl>
                    
                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword
                            name="password"
                            placeholder="Password"
                            fitContainer
                            {...register("password", rules.password)}
                        />
                    </FormControl>

                    <FormControl errorMessage={errors.password_confirmation?.message}> 
                        <InputPassword
                            name="password_confirmation"
                            placeholder="Konfirmasi Password"
                            fitContainer
                            {...register("password_confirmation", rules.password_confirmation)}
                        />
                    </FormControl>

                    <Button size="large" fitContainer disabled={status === statusList.process}>
                        {status === statusList.process ? "Sedang memproses" : "Mendaftar"}                
                    </Button>
                    
                </form>

                <div className="text-center mt-2">
                    Sudah punya akun? <Link to="/login"><b>Masuk Sekarang</b></Link>
                </div>
            </Card>
        </LayoutOne>
    )
}