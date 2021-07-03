import * as React from 'react';
import {useSelector} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRouteOnly = ({component: Component, ...rest}) => {
    let {user} = useSelector(state => state.auth);

    return <Route {...rest}>
        {!user ? <Component/> : <Redirect to="/" />}
    </Route>
}

export default GuestRouteOnly;