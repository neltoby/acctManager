import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import PageNotFound from './PageNotFind'
import Typography from "@material-ui/core/Typography";
import Transaction from './Transaction'
import TransitionsModal from './Modal'
import TransferTable from './TransferTable'
import DialogModal from './DialogModal'
import CheckModal from './CheckModal'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TopUp from './TopUp'
import Statement from './Statement'
import {useSelector, useDispatch} from 'react-redux'
import isJson from '../isJson';
import  {displayAccts} from '../action'

const ColorCircularProgress = withStyles({
    root: {
        // color: '#fff',
        color: '#00695c',
    },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
    overflow: {
        // display: 'flex',
        // flexGrow: 1,
    },
}))

const AllowedMain = (props) => {
    const ab = useStyles()
    const {bank, acct} = props
    const match = useRouteMatch()
    const history = useHistory()
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state))
    const redirect = (country, bank, acct) => {
        let newbank = bank.split(' ').join('-')
        history.push(`/bank/${country}/${newbank}/${acct}`)
        closeAcct()
    }
    const displayedAcct = isJson(store.home.displayedAcct)
    const closeAcct = () => {
        dispatch(displayAccts([]))
    }
    // const Statement = React.lazy(() => import('./Statement'))
    return (
        <>
        <ErrorBoundary>
            <Switch>
                <Route exact path={`${match.url}`}>                     
                        <Transaction bank={bank} account={acct} />
                </Route>
                <Route path={`${match.url}/transfer`}>
                        <Transaction bank={bank} account={acct} />
                </Route>
                <Route path={`${match.url}/statement`}>
                    <React.Suspense fallback={<h4>Loading statement of account ...</h4>}>
                        <Statement bank={bank} account={acct} />
                    </React.Suspense>
                </Route>
                <Route path={`${match.url}/top-up`}>
                    <React.Suspense fallback={<h4>Loading top up ...</h4>}>
                        <TopUp bank={bank} account={acct} />
                    </React.Suspense>
                </Route>
                <Route path={`${match.url}/*`}>
                    <React.Suspense fallback={<h4>Loading top up ...</h4>}>
                        <PageNotFound />
                    </React.Suspense>
                </Route>
            </Switch>
            {store.trans.loadingTransView ?
                <TransitionsModal open={store.trans.loadingTransView}>
                    <>
                        <ColorCircularProgress size={20} thickness={5} />
                        <Typography variant="body2" className={ab.bodyBold}>
                            {store.trans.transType.type == 'top-up' ? store.trans.transType.val === 'all' ?
                                'Loading all top-up' : 'Loading recent top-up' : store.trans.transType.val === 'all' ?
                                'Loading all transfer' : 'Loading recent transfer'}
                        </Typography>
                    </> 
                </TransitionsModal> : ''  
            }
            {store.trans.showDialog ? 
                <DialogModal 
                    open={store.trans.showDialog} 
                    title={store.trans.transType.type === 'transfer' ? 'Transfers' : 'Top up'}
                > 
                    <TransferTable /> 
                </DialogModal>: ''
            }
            {store.trans.checkDisplay ? 
                <CheckModal 
                    account={acct}
                    open={store.trans.checkDisplay} 
                    title={store.trans.transType.type === 'transfer' ? 'Transfers' : 'Top up'}
                /> 
            : ''
            }
            {displayedAcct.length ? 
                <DialogModal 
                    open={displayedAcct.length ? true : false } 
                    title='Select Account'
                    close = {closeAcct}
                > 
                    <List className={ab.root}>                      
                        {displayedAcct.map((acct, i) => {
                            return(
                                <ListItem alignItems="flex-start" onClick={() => redirect(acct.Country, acct.Bank, acct.Acct)}>
                                    <ListItemText
                                        primary={acct.Bank}
                                        secondary={
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={ab.inline}
                                                color="textPrimary"
                                            >
                                                {acct.Acct}
                                            </Typography>                                            
                                        }
                                    />
                                </ListItem>
                            )
                        })} 
                    </List>
                </DialogModal>: ''
            }

        </ErrorBoundary>   
        </>
    );
};

export default AllowedMain;