import React from 'react';
import DisplayTrans from './DisplayTrans'
import { useRouteMatch } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import PageNotFind from './PageNotFind';

const Bank = () => {
    const match = useRouteMatch()
    return (
        <>
            <Switch>
                <Route path={`${match.url}/:country/:bank`}>
                    <DisplayTrans />
                </Route>
                <Route path={`${match.url}/*`}>
                    <PageNotFind />
                </Route>
            </Switch>
            
        </>
    );
};

export default Bank;