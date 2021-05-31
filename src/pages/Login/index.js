import * as React from 'react';
//rules
import {rules} from './validation';

//components
import {InputText, InputPassword, Button, FormControl, Card, LayoutOne} from 'upkit';
import {useForm} from 'react-hook-form';
import {useHistory, Link} from 'react-router-dom';
import StoreLogo from '../../components/StoreLogo';

//api, redux and feature
import {login} from '../../api/auth';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../features/Auth/action';

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Login(){

    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    const [status, setStatus] = React.useState(statusList.idle);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async ({email, password}) => {

        setStatus(statusList.process);

        //send and get response from server
        let {data} = await login(email, password);

        //! error handling data
        if(data.error){

            setError('password', {type: 'invalidCredential', message: data.message});

            setStatus(statusList.error);
            return;
        }else{

            let {user, token} = data;
            //TODO dispatch ke redux store
            dispatch(userLogin(user, token));

            //TODO redirect
            history.push('/');
        }

        setStatus(statusList.success);
    }

    return (
        <LayoutOne size="small">
            <br/>
            <Card color="white">
                <div className="text-center mb-5">
                    <StoreLogo/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText 
                            placeholder="Email" 
                            fitContainer
                            name="email"
                            {...register('email', rules.email)}
                        />
                    </FormControl>

                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword
                            placeholder="Password"
                            name="password"
                            fitContainer
                            {...register('password', rules.password)}
                        />
                    </FormControl>

                    <Button fitContainer size="large" disabled={status === statusList.process}>Login</Button>
                </form>

                <div className="text-center mt-2">Belum punya akun? <Link to="/register"><b>Daftar Sekarang</b></Link></div>
            </Card>
        </LayoutOne>
    )
}