import React, { useEffect } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector, useDispatch} from 'react-redux'
import isJson from '../isJson';
import { useParams,useRouteMatch } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import AllAccount from './AllAccount'
import { errTrue } from '../b_action'

const useStyles = makeStyles(theme => ({
    broot: {
        flexGrow: 1,
        backgroundColor: 'rgba(128,128,128,0.1)',
    },
    roots: {
        flexGrow: 1,
        backgroundColor: '#332e2d',
    },
    lroot: {
        width: '100%',
        backgroundColor: 'inherit',
        color: 'white',
    },
}))

const DisplayTrans = () => {
    const ab = useStyles();
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state))
    const {country, bank} = useParams()
    let newBank = bank.split('-').join(' ');
    
    useEffect(() => {
        if(store.trans.banks.length){
            let obj = []
            let error = false ;
            store.trans.banks.forEach(b => {
                if(b.country === country){
                    if(b.banks.includes(newBank)){
                        obj = [...obj, b ]

                    }else{
                        error = `${bank} and ${country} do not match` 
                    }                
                }
            });
            if(!obj.length){
                if(!error) {
                    error = `Incorrect country match`
                }
                dispatch(errTrue(error))
            }
        }
    },[])
    return (
        <>
            {store.trans.errorResponse ?
                <div className={ab.err}>Error: {store.trans.errText}</div>
            : 
                <Switch>
                    <Route path={`${match.url}/:acct`}>
                        <AllAccount country={country} bank={newBank}/>
                    </Route>
                </Switch> 
            }
            
        </>
    );
};

export default DisplayTrans;