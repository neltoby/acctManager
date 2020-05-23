import React, {Suspense, lazy} from 'react';
import ErrorBoundary from "./ErrorBoundary";
import Header from './Header'
import LoginOut from './LoginOut'
import {makeStyles} from "@material-ui/core/styles";
import { getbankFxn } from '../action'
import {useDispatch, useSelector} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import isJson from '../isJson'; 

const Home = lazy(() => import('./Home'))
const Profile = lazy(() => import('./Profile'))
const Bank = lazy(() => import('./Bank'))
const OpenAccount = lazy(() => import('./OpenAccount'))
const PageNotFind = lazy(() => import('./PageNotFind'))
const Modal = lazy(() => import('./Modal')) 
const TokenLogin = lazy(() => import('./TokenLogin')) 

const useStyles = makeStyles(theme => ({
    broot: {
        flexGrow: 1,
    },
}))

const InRoute = () => {
    const ab = useStyles();
    const store = isJson(useSelector(state => state));
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getbankFxn())
    },[store.token.tokenError])
    
    const displayModal = store.token.tokenError ? <Suspense fallback={<h4>Loading ...</h4>}><Modal open={store.token.tokenError}><TokenLogin /></Modal></Suspense> : '' ;
    const logout = store.create.loggingOut ? <Suspense fallback={<h4>Logging out ...</h4>}><Modal open={store.create.loggingOut}><LoginOut /></Modal></Suspense> : '' ;
    return (
        <div className={ab.broot}>
            <Header/>
            {!store.token.tokenError ? !store.home.loading ?
                <Switch>
                    <Route exact path='/'><Suspense fallback={<h4>Loading ...</h4>}><Home /></Suspense></Route>
                    <Route path='/profile'><Suspense fallback={<h4>Loading ...</h4>}><Profile /></Suspense></Route>
                    <Route path='/bank/'><Suspense fallback={<h4>Loading ...</h4>}><Bank /></Suspense></Route>                  
                    <Route path='/open-account'><Suspense fallback={<h4>Loading ...</h4>}><OpenAccount /></Suspense></Route>
                    <Redirect from = '/login' to = '/' />
                    <Route path='/*'><Suspense fallback={<h4>Loading ...</h4>}><PageNotFind /></Suspense></Route>
                </Switch>
                :
                <h4> Loading Page</h4> 
                : <h4>Please login</h4>
            }
            {displayModal}
            {logout}
        </div>
    );
};

export default InRoute;