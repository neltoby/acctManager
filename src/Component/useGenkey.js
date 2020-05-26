import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFindacct from './useFindacct';
import {genKey, confirmKeys, generateKey,selectKeyTime} from '../b_action'
import isJson from '../isJson'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TransitionsModal from './Modal'
import SelectTime from './SelectTime'
import NoEncryption from '@material-ui/icons/NoEncryption'
import VpnKey from '@material-ui/icons/VpnKey'
import {makeStyles, withStyles} from "@material-ui/core/styles"
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const ColorCircularProgress = withStyles({
    root: {
        // color: '#fff',
        color: '#00695c',
    },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
    get_key: {
        color: '#3f51b5',
        backgroundColor: '#eee',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.7rem',
            color: '#3f51b5',
            backgroundColor: '#ccc',
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
        },
    },
    key: {
        color: 'lightgreen',
        width: '16px',
        height: '16px',
    },
    expired: {
        color: 'red',
        width: '16px',
        height: '16px',
    },
    nokey: {
        color: '#111',
        width: '16px',
        height: '16px',
    },
}))


const useGenkey = (acct) => {
    const ab = useStyles()
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const id = useFindacct(acct)
    const bank = id[0].Bank.split(' ').join('_')
    const acctToken = `${bank}${acct}`
    const generate = (time) => {
        if(id.length){
            try{
                let obj={uid: id[0].User, bid: id[0].Id}
                dispatch(genKey(obj,time, acctToken))
            }catch(e){
                console.log(e)
            }
        }      
    } 
    const openGenerate = () => {
        dispatch(selectKeyTime())
    }
    const confirmKey = () => {
        if(cookies.get(acctToken)){
            let obj = {bid: id[0].Id}
            dispatch(confirmKeys(obj, acctToken))
        }else{
            dispatch(generateKey({}))
        }
    } 
    const buttonKey = () => {
        return(
            <>
            <Button className={ab.get_key} onClick={openGenerate}>
                {store.trans.genKeyLoading ? <ColorCircularProgress size={20} /> :  'Generate key' }
            </Button>
            <TransitionsModal open={store.trans.selectKeyTime}>
                <SelectTime generate={generate} />
            </TransitionsModal>
            </>
        )
    }
    const icons = () => {
        return(
            <>
                {cookies.get(acctToken) ? Object.entries(store.trans.genKey).length > 0 ?
                    store.trans.genKey.status === 'active' ? 
                    <VpnKey className={ab.key} /> : <VpnKey className={ab.expired} /> : 
                    <NoEncryption className={ab.nokey} /> : <NoEncryption className={ab.nokey} />
                }
            </>
        )
    }
    return {buttonKey, icons, confirmKey, acctToken}
};

export default useGenkey;