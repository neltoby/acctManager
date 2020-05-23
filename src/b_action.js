import axios from 'axios';
import isJson from './isJson';
import Cookies from 'universal-cookie'
import {invalidToken, statementDenied, statement} from './action'

const cookies = new Cookies();

export const B_LOAD_STOP = 'B_LOAD_STOP';
export const B_ERR_TRUE = 'B_ERR_TRUE';
export const B_READY = 'B_READY';
export const GEN_KEY_LOADING = 'GEN_KEY_LOADING';
export const KEY_STOP_LOADING = 'KEY_STOP_LOADING';
export const GEN_KEY = 'GEN_KEY';
export const TRANS_LOADING = 'TRANS_LOADING'
export const TRANS_ERR = 'TRANS_ERR'
export const CANCEL_TRANS = 'CANCEL_TRANS'
export const END_TRANS = 'END_TRANS'
export const EXPIRED_KEY = 'EXPIRED_KEY'
export const CONFIRM_TRANS = 'CONFIRM_TRANS'
export const TRANS_SUCCESS = 'TRANS_SUCCESS'
export const MERGED_SAVING = 'MERGED_SAVING'
export const UPDATE_KEY = 'UPDATE_KEY'
export const TOP_UP_LOADING = 'TOP_UP_LOADING'
export const STOP_TOP_UP_LOADING = 'STOP_TOP_UP_LOADING'
export const MERGED_SAVING_FALSE = 'MERGED_SAVING_FALSE'
export const TRANS_LOADING_STOP = 'TRANS_LOADING_STOP'
export const UPDATE_TRANS_RESULT = 'UPDATE_TRANS_RESULT'
export const LOADING_TRANS_VIEW = 'LOADING_TRANS_VIEW'
export const TRANS_TYPE = 'TRANS_TYPE'
export const DIALOG_OPEN = 'DIALOG_OPEN'
export const DIALOG_CLOSE = 'DIALOG_CLOSE'
export const STOP_LOADING_TRANS_VIEW = 'STOP_LOADING_TRANS_VIEW'

export const closeDialog = () => {
    return {
        type: DIALOG_CLOSE,
    }
}
export const displayDialog = () => {
    return {
        type: DIALOG_OPEN,
    }
}
export const transLoading = () => {
    return {
        type: TRANS_LOADING,
    }
}
export const stopLoadingTransView = () => {
    return {
        type: STOP_LOADING_TRANS_VIEW ,
    }
}
export const upTransResult = payload => {
    return {
        type: UPDATE_TRANS_RESULT,
        payload: payload
    }
}
export const loadingTransView = () => {
    return {
        type: LOADING_TRANS_VIEW,
    }
}
export const transType = payload => {
    return {
        type: TRANS_TYPE,
        payload: payload
    }
}
export const updateKey = payload => {
    return {
        type: UPDATE_KEY,
        payload: payload
    }
}
export const expiredKey = payload => {
    return {
        type: EXPIRED_KEY,
        payload: payload
    }
}
// export const insertInput = payload => { 
//     let action = payload.name === 'bank' ? INSERT_INPUT_BANK : payload.name === 'acct' ? INSERT_INPUT_ACCT :
//     payload.name === 'key' ? INSERT_INPUT_KEY : payload.name === 'pin' ? INSERT_INPUT_PIN : INSERT_INPUT_AMT
//     return {
//         type: action,
//         payload: payload.value
//     }
// }
export const mergedSaving = () => {
    return {
        type: MERGED_SAVING,
    }
} 
export const mergedSavingFalse = () => {
    return {
        type: MERGED_SAVING_FALSE,
    }
} 
export const transLoadingStop = () => {
    return {
        type: TRANS_LOADING_STOP,
    }
}
export const transErr = payload => {
    return {
        type: TRANS_ERR,
        payload: payload,
    }
}
export const genKeyLoading = () => {
    return {
        type: GEN_KEY_LOADING,
    }
}
export const keyStopLoading = () => {
    return {
        type: KEY_STOP_LOADING,
    }
}
export const generateKey = payload => {
    return {
        type: GEN_KEY,
        payload: payload
    }
}
export const stopLoad = () => {
    return {
        type: B_LOAD_STOP
    }
}
export const confirmTransaction = payload => {
    return {
        type: CONFIRM_TRANS,
        payload: payload
    }
}
export const topUpLoading = () => {
    return {
        type: TOP_UP_LOADING,
    }
}
export const stopTopUpLoading = () => {
    return {
        type: STOP_TOP_UP_LOADING,
    }
}
export const transSuccess = () => {
    return {
        type: TRANS_SUCCESS,
    }
}
export const endTrans = () => {
    return {
        type: END_TRANS
    }
}
export const errTrue = (payload) => {
    return {
        type: B_ERR_TRUE,
        payload: payload,
    }
}
export const bReady = () => {
    return {
        type: B_READY
    }
}
export const transEnd = () => {
    return function(dispatch, getState) {
        dispatch(endTrans())
        dispatch(transLoadingStop())
    }
}
export const callTransfer = (payload) => {
    return function(dispatch, getState) {
        dispatch(transType(payload))
        dispatch(loadingTransView())
    }
}
export const callTopUp = (payload) => {
    return function(dispatch, getState) {
        dispatch(transType(payload))
        dispatch(loadingTransView())
    }
}
export const callTransType = (payload, acct) => {
    return function(dispatch, getState) { 
        dispatch(closeDialog())      
        dispatch(loadingTransView())
        dispatch(transType(payload))
        setTimeout(() => {           
            dispatch(stopLoadingTransView())
            dispatch(displayDialog())
        }, 1000); 
    }
}
export const topUp = (obj, acct) => {
    return function(dispatch, getState) {
        dispatch(topUpLoading())
        dispatch(transLoading())
        return axios.post('http://localhost:3000/top-up', obj, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                if(res.data.status){  
                    if(res.data.success){
                        setTimeout(() => {
                            dispatch(transSuccess())
                        }, 1000);
                    }else if(res.data.resMsg || res.data.nonMsg){
                        dispatch(transErr(res.data.resMsg || res.data.nonMsg))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 2000);
                    }else if(res.data.keyMsg){
                        dispatch(generateKey({}))
                            cookies.remove(acct,{ path: '/'})
                            dispatch(transErr(res.data.keyMsg))
                            setTimeout(() => {
                                dispatch(transLoadingStop())
                                dispatch(transErr(''))
                            }, 6000);
                    }
                    else if(res.data.resExp){
                        dispatch(generateKey(res.data.resExp))
                        dispatch(transErr('Expired key'))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 2000);
                        // cookies.remove('tr_key',{ path: '/'})
                        // console.log('tr_key removed')
                        // dispatch(generateKey({})) 
                    }
                    // else{
                    //     dispatch(generateKey(isJson(res.data.res))) 
                    // }         
                               
                }else{
                    if(res.data.type === 'login' && !res.data.tok){
                        dispatch(invalidToken(res.data.msg))
                        dispatch(transLoadingStop())
                    }else{
                        dispatch(transErr(res.data.msg))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 2000);
                    }
                }
                dispatch(stopTopUpLoading())
            }, (error) => {
                dispatch(transErr('Unable to connect to server'))
                setTimeout(() => {
                    dispatch(stopTopUpLoading())
                    dispatch(transLoadingStop())
                    dispatch(transErr(''))
                }, 3000);
        });
    };
}
export const recontinueTrans = (formData, acct) => {
    return function(dispatch, getState) {
        dispatch(confirmTransaction({}))
        return axios.post('http://localhost:3000/contd-trans', formData, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                if(res.data.status){  
                    if(res.data.success){
                        setTimeout(() => {
                            dispatch(transSuccess())
                        }, 1000); 
                    }else{
                        if(res.data.res){
                            dispatch(generateKey({})) 
                            cookies.remove(acct,{ path: '/'})
                            dispatch(transErr(
                                'Your key expired. Generate a new key to continue your transaction'))
                                setTimeout(() => {
                                    dispatch(transLoadingStop())
                                    dispatch(transErr(''))
                                }, 3000);                            
                        }else if(res.data.keyMsg){
                            dispatch(generateKey({}))
                            cookies.remove(acct,{ path: '/'})
                            dispatch(transErr(res.data.keyMsg))
                            setTimeout(() => {
                                dispatch(transLoadingStop())
                                dispatch(transErr(''))
                            }, 6000); 
                        }
                    }                  
                }else{
                    if(!res.data.tok && res.data.type === 'login'){
                        dispatch(invalidToken(res.data.msg))
                    }else{
                        dispatch(transErr(res.data.msg))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 3000);
                    }
                }
                // dispatch(stopLoad())
            }, (error) => {
                console.log(error.response)
                dispatch(transErr('Unable to connect to server'))
                setTimeout(() => {
                    dispatch(transLoadingStop())
                    dispatch(transErr(''))
                }, 3000);
        });
    };
}
export const submitMerged = (formData, acct) => {
    return function(dispatch, getState) {
        dispatch(mergedSavingFalse())
        dispatch(confirmTrans(formData, acct))
    };
} 
export const confirmTrans = (formData, acct) => {
    return function(dispatch, getState) {
        dispatch(transLoading())
        return axios.post('http://localhost:3000/process-trans', formData, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                if(res.data.status){            
                    if(res.data.resMsg){
                        dispatch(transErr(res.data.resMsg))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 2000);
                    }else{
                        if(res.data.resExp){
                            dispatch(generateKey(res.data.resExp))
                            dispatch(transErr('Expired key'))
                            setTimeout(() => {
                                dispatch(transLoadingStop())
                                dispatch(transErr(''))
                            }, 2000);
                        }else if(res.data.keyMsg || res.data.nonMsg){
                            // dispatch(updateKey(res.data.code))
                            dispatch(generateKey({}))
                            cookies.remove(acct,{ path: '/'})
                            dispatch(transErr(res.data.keyMsg || res.data.nonMsg))
                            setTimeout(() => {
                                dispatch(transLoadingStop())
                                dispatch(transErr(''))
                            }, 6000);
                        }
                        else{
                            dispatch(confirmTransaction(res.data.res))
                        }                       
                    }             
                }else{
                    if(!res.data.tok && res.data.type === 'login'){
                        dispatch(invalidToken(res.data.msg))
                    }else{
                        dispatch(transErr(res.data.msg))
                        setTimeout(() => {
                            dispatch(transLoadingStop())
                            dispatch(transErr(''))
                        }, 2000);
                    }
                }
                // dispatch(stopLoad())
            }, (error) => {
                console.log(error.response)
                let payload = `${error.response.status}: ${error.response.statusText}` || 'Unable to connect to server'
                dispatch(transErr(payload))
                setTimeout(() => {
                    dispatch(transLoadingStop())
                    dispatch(transErr(''))
                }, 2000);
                // let payload = error.response.status || 'Could not connect to server'
                // dispatch(errTrue(payload))
                // dispatch(stopLoad())
        });
    };
}
export const confirmKeys = (obj, acct) => {
    return function(dispatch, getState) {
        dispatch(generateKey({}))
        return axios.post('http://localhost:3000/confirm-key', obj, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                if(res.data.status){  
                    if(res.data.expMsg){
                        cookies.remove(acct,{ path: '/'})
                        console.log('tr_key removed')
                        // dispatch(generateKey({})) 
                    }else if(res.data.nonMsg) {
                        cookies.remove(acct,{ path: '/'})
                        dispatch(generateKey({}))
                    }
                    else{
                        dispatch(generateKey(isJson(res.data.res))) 
                    }         
                               
                }else{
                    if(res.data.type === 'login' && !res.data.tok){
                        dispatch(invalidToken(res.data.msg))
                    }
                }
            }, (error) => {
                // dispatch(transErr('Unable to connect to server'))
                // setTimeout(() => {
                //     dispatch(transLoadingStop())
                // }, 3000);
        });
    };
}
export const genKey = (id,expires,acct) => {
    return function(dispatch, getState) {
        dispatch(genKeyLoading())
        console.log(id.bid)
        dispatch(statementDenied(id.bid))
        dispatch(statement({bid: id.bid, credit: [], debit: []}))
        return axios.post('http://localhost:3000/gen-key', {id: id, expires: expires}, 
        {headers: {'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                if(res.data.status){            
                    dispatch(generateKey(isJson(res.data.res)))
                    // let tokename = acct
                    // cookies.set('tr_key', res.data.tok, { path: '/'})
                    cookies.set(acct, res.data.tok, { path: '/'})
                }else{
                    if(res.data.type === 'login' && !res.data.tok){
                        dispatch(invalidToken(res.data.msg))
                    }
                }
                setTimeout(() => {
                    dispatch(keyStopLoading())
                }, 3000);               
            }, (error) => {
                console.log(error.response)
                setTimeout(() => {
                    dispatch(keyStopLoading())
                }, 3000); 
        });
    };
}
