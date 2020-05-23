import React from 'react';
import SignUpIn from "./SignUpIn";
import PageNotFind from "./PageNotFind";
import PasswordRecovery from './PasswordRecovery'
import { Route, Switch, Redirect } from 'react-router-dom'

const OutRoute = () => {
    return (
        <Switch>
            <Redirect exact from='/' to='/login'/>
            <Route path='/login'><SignUpIn /></Route>
            <Route path='/create'><SignUpIn /></Route>
            <Route path='/recover-password'><PasswordRecovery /></Route>
            <Route path='/*'><PageNotFind /></Route>
        </Switch>
        

    );
};

export default OutRoute;