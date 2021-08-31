import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {LayoutOne} from 'upkit';
import { BounceLoader } from 'react-spinners';
//redux
import {useDispatch} from 'react-redux';
import { userLogout } from '../../features/Auth/action';
import { logout } from '../../api/auth';

export default function Logout(){
    let history = useHistory();
    let dispatch = useDispatch();

    React.useEffect(() => {
        logout()
            .then(() => dispatch(userLogout()))
            .then(() => history.push('/'))
                 
    }, [dispatch, history]);

    return (
        <LayoutOne size="small">
            <div className="text-center flex flex-col justify-center items-center">
                <BounceLoader color="red" />
                <br/>
                Logging out...
            </div>
        </LayoutOne>
    )
}