import * as React from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const GuardRoute = ({component: Component, ...rest}) => {
    let {user} = useSelector(state => state.auth);

    return (
        <Route {...rest}>
            {user ? <Component/> : <Redirect to="/login"/>}
        </Route>
    )
}

export default GuardRoute;