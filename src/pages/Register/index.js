import * as React from 'react';
import {LayoutOne, Card, FormControl, InputText, InputPassword, Button} from 'upkit';

import {useForm} from 'react-hook-form';

export default function Register(){

    let {register, handleSubmit, formState: {errors}, setError} = useForm();

    const onSubmit =  async (formData) => {
        alert(JSON.stringify(formData));
    }

    return(
        <LayoutOne size="small">
            <Card color="white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <InputText 
                            name="full_name"
                            placeholder="Nama Lengkap"
                            fitContainer
                            {...register("full_name")}
                            // ref={register}
                        />
                    </FormControl>
                        
                    <FormControl>
                        <InputText
                            name="email"
                            placeholder="Email"
                            fitContainer
                            {...register("email")}
                            
                        />
                    </FormControl>
                    
                    <FormControl>
                        <InputPassword
                            name="password"
                            placeholder="Password"
                            fitContainer
                            {...register("password")}
                        />
                    </FormControl>

                    <FormControl>
                        <InputPassword
                            name="password_confirmation"
                            placeholder="Konfirmasi Password"
                            fitContainer
                            {...register("password_confirmation")}
                        />
                    </FormControl>

                    <Button size="large" fitContainer>
                        Mendaftar
                    </Button>
                    
                </form>
            </Card>
        </LayoutOne>
    )
}