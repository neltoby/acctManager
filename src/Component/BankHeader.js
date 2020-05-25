import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useGenkey from './useGenkey'
import {useSelector, useDispatch} from 'react-redux'
import useTime from './useTime';
import useFindacct from './useFindacct'
import isJson from '../isJson'
import { topUp, callTransType } from '../b_action';

const useStyles = makeStyles(theme => ({
    font: {
        [theme.breakpoints.down('md')]: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        }
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        padding: '0.8rem 1rem',
        borderBottom: '1px solid #eee',
        color: '#7f7f7f',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transfer: {
        fontSize: '1.2rem',
    },
    red: {
        color: 'tomato',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
    green: {
        color: 'lightgreen',
        fontWeight: 'bold',
        fontSize: '1rem',
        textAlign: 'center',
    },
}))

const BankHeader = (props) => {
    const match = useRouteMatch()
    const {bank,account} = props
    const id = useFindacct(account)
    const {acctToken} = useGenkey(account)
    const bnk = bank.split(' ').join('-')
    const url = `/bank/Nigeria/${bnk}/${account}`
    const statement = useRouteMatch(`${url}/statement`)
    const ab = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const {buttonKey, icons} = useGenkey(account)
    const checkTime = Object.entries(store.trans.genKey).length ? store.trans.genKey.expires : '' ;
    const {refinedTime, selector} = useTime(checkTime)
    let keyPhase = selector === 'red' ? ab.red : ab.green ;
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };
    const transfer = (val) => {
        console.log(id[0].Id)
        dispatch(callTransType({type: 'transfer', val: val, id: id[0].Id}))
        // console.log('transfer', val)
        handleMenuClose()
    }
    const topUpFxn = (val) => {
        console.log(id[0].Id)
        dispatch(callTransType({type: 'top-up', val: val, id: id[0].Id}))
        // console.log(val, 'top-up')
        handleMenuClose()
    }
    const fxn = match.url === url || match.url === `${url}/transfer` ? transfer : topUpFxn ;
    const menuId = 'cehck-list';
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem className={ab.font} onClick={() => fxn('recent')}>
                <Switch>
                    <Route exact path={`${url}`}>                     
                        Recent Transfer
                    </Route>
                    <Route path={`${url}/transfer`}>
                        Recent Transfer
                    </Route>
                    <Route path={`${url}/top-up`}>
                        Recent Top Up 
                    </Route>
                </Switch>
            </MenuItem>
            <MenuItem className={ab.font} onClick={() => fxn('all')}>
                <Switch>
                    <Route exact path={`${url}`}>                     
                        All Transfer
                    </Route>
                    <Route path={`${url}/transfer`}>
                        All Transfer
                    </Route>
                    <Route path={`${url}/top-up`}>
                        All Top Up 
                    </Route>
                </Switch>
            </MenuItem>
        </Menu>
      );
    return (
        <div>
            <Grid container className={ab.heading}>
                <Grid item container md={3} xs={3} className={ab.transfer}>
                <Switch>
                    <Route exact path={`${url}`}>                     
                            Transfer
                    </Route>
                    <Route path={`${url}/transfer`}>
                            Transfer
                    </Route>
                    <Route path={`${url}/top-up`}>
                            Top Up 
                    </Route>
                    <Route path={`${url}/statement`}>
                            Statement 
                    </Route>
                </Switch>
                </Grid>
                <Grid item container md={2} xs={2} className={ab.flex}>
                    <span className={keyPhase}>{refinedTime}</span>
                </Grid>
                <Grid item container md={5} xs={6}>
                    <Grid container>
                        <Grid item xs={9}>
                            {buttonKey()}
                        </Grid>
                        <Grid item xs={3}>
                            {icons()}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container md={2} xs={1}>
                {statement === null ? 
                    <>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        {renderMenu}
                    </> : ''
                }               
                </Grid>
            </Grid>
            
        </div>
    );
};

export default BankHeader;