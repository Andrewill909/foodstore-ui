import * as React from 'react';
import StoreLogo from '../StoreLogo';
//router
import {Link} from 'react-router-dom';
//redux
import {useSelector} from 'react-redux';
//components
import {Responsive, ButtonCircle} from 'upkit';
//icon
import FaUser from '@meronex/icons/fa/FaUser';

export default function TopBar(){

    let auth = useSelector(state => state.auth);

    return(
        <Responsive desktop={2} justify="between" items="center">
            <div>
                <StoreLogo/>
            </div>
            <div className="mr-5 text-right">
                <Link to={auth?.user ? '/account' : '/login'}>
                    <div className="mr-2 inline-block text-red-600 font-bold">
                        {auth?.user?.full_name || 'Login'}
                    </div>
                    <ButtonCircle icon={<FaUser/>} />
                </Link>
            </div>
        </Responsive>
    )
}