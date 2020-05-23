import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DisplayTrans from './DisplayTrans'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import PageNotFind from './PageNotFind';

// const useStyles = makeStyles(theme => ({
//     broot: {
//         flexGrow: 1,
//     },
// }))

const Bank = () => {
    const match = useRouteMatch()
    // const bank
    // let newBank = bank.split('-').join(' ');
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