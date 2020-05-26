import axios from 'axios';
import isJson from './isJson';
import {generateKey} from './b_action'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const LOGGEDIN = 'LOGGEDIN';
export const LOGGEDOUT = 'LOGGEDOUT';
export const LOADING = 'LOADING';
export const RELEASE = 'RELEASE';
export const SET_BANKS = 'SET_BANKS';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const VALID_TOKEN = 'VALID_TOKEN';
export const STOP_LOADING = 'STOP_LOADING';
export const FAILED_ACCT = 'FAILED_ACCT';
export const GETBANKS = 'GETBANKS';
export const DISPLAY_OVERLAY = 'DISPLAY_OVERLAY'
export const REMOVE_OVERLAY = 'REMOVE_OVERLAY'
export const OPEN_ACCT_ERR = 'OPEN_ACCT_ERR'
export const UPDATE_BANK = 'UPDATE_BANK';
export const LOAD_TRANSACTION = 'LOAD_TRANSACTION';
export const STOP_LOAD_TRANSACTION = 'STOP_LOAD_TRANSACTION';
export const UPLOAD_TRANSACTION = 'UPLOAD_TRANSACTION';
export const GETBANK_STOP_LOADING = 'GETBANKS_STOP_LOADING';
export const GETBANK_LOADING = 'GETBANK_LOADING';
export const CHECK_DISPLAY = 'CHECK_DISPLAY'
export const ACCOUNT_BAL = 'ACCOUNT_BAL'
export const STATEMENT_ACCESS = 'STATEMENT_ACCESS'
export const STATEMENT_DENIED = 'STATEMENT_DENIED'
export const STATEMENT = 'STATEMENT'
export const STATEMENT_ERR = 'STATEMENT_ERR'
export const STATEMENT_LOADING = 'STATEMENT_LOADING'
export const STATEMENT_LOADING_STOP = 'STATEMENT_LOADING_STOP'
export const CHECK_BAL_ERR = 'CHECK_BAL_ERR'
export const CHECK_BAL_LOADING = 'CHECK_BAL_LOADING'
export const CHECK_BAL_LOADING_STOP = 'CHECK_BAL_LOADING_STOP'
export const CHECK_DISPLAY_FALSE = 'CHECK_DISPLAY_FALSE'
export const DISPLAY_ACCTS = 'DISPLAY_ACCTS'
export const LOGGING_OUT = 'LOGGING_OUT'
export const CANCEL_LOGOUT = 'CANCEL_LOGOUT'

export const loggingOut = () => {
    return {
        type: LOGGING_OUT,
    }
}
export const cancelLogout = () => {
    return {
        type: CANCEL_LOGOUT,
    }
}
export const displayAccts = payload => {
    return {
        type: DISPLAY_ACCTS,
        payload: payload,
    }
}
export const statementErr = payload => {
    return {
        type: STATEMENT_ERR,
        payload: payload,
    }
}
export const statementLoading = () => {
    return {
        type: STATEMENT_LOADING,
    }
}
export const statementLoadingStop = () => {
    return {
        type: STATEMENT_LOADING_STOP,
    }
}
export const statement = payload => {
    return {
        type: STATEMENT,
        payload: payload,
    }
}
export const statementAccess = payload => {
    return {
        type: STATEMENT_ACCESS,
        payload: payload,
    }
}
export const statementDenied = payload => {
    return {
        type: STATEMENT_DENIED,
        payload: payload,
    }
}
export const acctBal = payload => {
    return {
        type: ACCOUNT_BAL,
        payload: payload,
    }
}
export const checkBalLoading = () => {
    return {
        type: CHECK_BAL_LOADING,
    }
} 
export const checkBalLoadingStop = () => {
    return {
        type: CHECK_BAL_LOADING_STOP,
    }
} 
export const displayCheckKeyFalse = () => {
    return {
        type: CHECK_DISPLAY_FALSE,
    }
}
export const checkBalErr = payload => {
    return {
        type: CHECK_BAL_ERR,
        payload: payload
    }
}
export const displayCheckKey = () => {
    return {
        type: CHECK_DISPLAY,
    }
}
export const updateBank = (payload) => {
    return {
        type: UPDATE_BANK,
        payload: payload,
    }
}
export const logout = () => {
    return {
        type: LOGGEDOUT
    }
}
export const login = () => {
    return {
        type: LOGGEDIN
    }
}
export const setBank = payload => {
    return {
        type: SET_BANKS,
        payload: payload,
    }
}
export const openAcctErr = payload => {
    return {
        type: OPEN_ACCT_ERR
    }
}
export const loading = () => {
    return {
        type: LOADING
    }
}
export const endloading = () => {
    return {
        type: STOP_LOADING
    }
}
export const failedAcct = payload => {
    return {
        type: FAILED_ACCT,
        payload: payload,
    }
}
export const removeSideBar = () => {
    return {
        type: REMOVE_OVERLAY,
    }
}
export const displaySideBar = () => {
    return {
        type: DISPLAY_OVERLAY,
    }
}
export const release = () => {
    return {
        type: RELEASE,
    }
}
export const getbank = payload => {
    return {
        type: GETBANKS,
        payload: payload,
    }
}
export const invalidToken = payload => {
    return {
        type: INVALID_TOKEN,
        payload: payload,
    }
}
export const validToken = () => {
    return {
        type: VALID_TOKEN,
    }
}
export const getBankLoading = () => {
    return {
        type: GETBANK_LOADING,
    }
}
export const stopBankLoading = () => {
    return {
        type: GETBANK_STOP_LOADING,
    }
}
export const uploadTransaction = payload => {
    return {
        type: UPLOAD_TRANSACTION,
        payload: payload,
    }
}
export const loadTransaction = () => {
    return {
        type: LOAD_TRANSACTION,
    }
}
export const stoploadTransaction = () => {
    return {
        type: STOP_LOAD_TRANSACTION,
    }
}
export const sendComplain = (text) => {
    return function(dispatch, getState){
        return axios.post('http://localhost:3000/sendComplain', text, {headers: {'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                console.log(res)
                // if(res.data.status){            
                //     if(res.data.keyMsg || res.data.nonMsg){
                //         dispatch(checkBalErr(res.data.keyMsg || res.data.nonMsg))
                //         dispatch(checkBalLoadingStop())
                //         setTimeout(() => {
                //             dispatch(checkBalErr(''))
                //         }, 3000);
                //     }else{
                //         if(res.data.resExp){
                //             dispatch(generateKey(res.data.resExp))
                //             dispatch(checkBalErr('Expired key'))
                //             dispatch(checkBalLoadingStop())
                //             setTimeout(() => {
                //                 dispatch(checkBalErr(''))
                //             }, 3000);
                //         }                  
                //         else{
                //             dispatch(checkBalLoadingStop())
                //             dispatch(acctBal(res.data.report))
                //         }                       
                //     }             
                // }else{
                //     dispatch(checkBalErr(res.data.msg))
                //     dispatch(checkBalLoadingStop())
                //     setTimeout(() => {
                //         dispatch(checkBalErr(''))
                //     }, 3000);
                // }
            }, (error) => {
                let payload = `${error.response.status}: ${error.response.statusText}` || 'Unable to connect to server'
                dispatch(checkBalErr(payload))
                dispatch(checkBalLoadingStop())
                setTimeout(() => {
                    dispatch(checkBalErr(''))
                }, 3000);
        });
    }
}
export const checkStatement = (acct, info) => {
    return function(dispatch, getState) {
        dispatch(statementLoading());
        return axios.post('http://localhost:3000/statement', info, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                if(res.data.status){            
                    if(res.data.keyMsg || res.data.nonMsg){
                        dispatch(statementErr(res.data.keyMsg || res.data.nonMsg))
                        dispatch(statementLoadingStop())
                        setTimeout(() => {
                            dispatch(statementErr(''))
                        }, 3000);
                    }else{
                        if(res.data.resExp){
                            dispatch(generateKey(res.data.resExp))
                            dispatch(statementErr('Expired key'))
                            dispatch(statementLoadingStop())
                            setTimeout(() => {
                                dispatch(statementErr(''))
                            }, 3000);
                        }                  
                        else{
                            dispatch(statement(isJson(res.data.report)))
                            dispatch(statementLoadingStop())
                            dispatch(statementAccess(res.data.report.bid))                
                        }                       
                    }             
                }else{
                    dispatch(statementErr(res.data.msg))
                    dispatch(statementLoadingStop())
                    setTimeout(() => {
                        dispatch(statementErr(''))
                    }, 3000);
                }
            }, (error) => {
                let payload = `${error.response.status}: ${error.response.statusText}` || 'Unable to connect to server'
                dispatch(statementErr(payload))
                dispatch(statementLoadingStop())
                setTimeout(() => {
                    dispatch(statementErr(''))
                }, 3000);
        });
    }
}
export const checkBal = (acct, info) => {
    return function(dispatch, getState) {
        dispatch(checkBalLoading());
        return axios.post('http://localhost:3000/check-bal', info, {headers: {'x-key': cookies.get(acct), 'x-token': cookies.get('login')}})
            .then((response) => {
                let res = isJson(response);
                if(res.data.status){            
                    if(res.data.keyMsg || res.data.nonMsg){
                        dispatch(checkBalErr(res.data.keyMsg || res.data.nonMsg))
                        dispatch(checkBalLoadingStop())
                        setTimeout(() => {
                            dispatch(checkBalErr(''))
                        }, 3000);
                    }else{
                        if(res.data.resExp){
                            dispatch(generateKey(res.data.resExp))
                            dispatch(checkBalErr('Expired key'))
                            dispatch(checkBalLoadingStop())
                            setTimeout(() => {
                                dispatch(checkBalErr(''))
                            }, 3000);
                        }                  
                        else{
                            dispatch(checkBalLoadingStop())
                            dispatch(acctBal(res.data.report))
                        }                       
                    }             
                }else{
                    dispatch(checkBalErr(res.data.msg))
                    dispatch(checkBalLoadingStop())
                    setTimeout(() => {
                        dispatch(checkBalErr(''))
                    }, 3000);
                }
            }, (error) => {
                let payload = `${error.response.status}: ${error.response.statusText}` || 'Unable to connect to server'
                dispatch(checkBalErr(payload))
                dispatch(checkBalLoadingStop())
                setTimeout(() => {
                    dispatch(checkBalErr(''))
                }, 3000);
        });
    }
}
export const getbankFxn = () => {
    return function(dispatch, getState) {
        dispatch(getBankLoading());
        return axios.get('http://localhost:3000/getbank', {headers: {'x-token': cookies.get('login')}})
        .then((response) => {
            let res = isJson(response);
            if(res.data.status){            
                let payload = {bank: res.data.bank, transaction: res.data.transaction, user: res.data.user}
                dispatch(getbank(payload)); 
                dispatch(setBank(res.data.country))             
            }else{
                if(!res.data.tok){
                    dispatch(invalidToken(res.data.msg))
                    cookies.remove('login')
                }                                         
            }
            dispatch(stopBankLoading())  
        }, (error) => {
            dispatch(stopBankLoading());
        });
    };
}
export const createAcct = (formData,history) => {
    return function(dispatch, getState) {
        dispatch(loading());
        return axios.post('http://localhost:3000/createAcct',formData )
        .then((response) => {
            let res = isJson(response);
            if(!res.data.status){
                setTimeout(() => {
                    let payload = {name: res.data.name, msg: res.data.msg}
                    dispatch(failedAcct(payload));
                    dispatch(endloading());
                    setTimeout(() => {
                        dispatch(release());
                    }, 4000);
                }, 2000);
                
            }else{    
                setTimeout(() => {
                    cookies.set('login', res.data.token, { path: '/'})
                    dispatch(login());
                    dispatch(endloading());
                    history.push('/')
                }, 1000);           
                
            }
        }, (error) => {
            dispatch(endloading());
        });
    };
}

export const retrieveToken = (formData, history, location) => {
    return function(dispatch, getState) {
        dispatch(loading());
        return axios.post('http://localhost:3000/login',formData )
        .then((response) => {
            let res = isJson(response);
            if(!res.data.status){
                setTimeout(() => {
                    let payload = {name: res.data.name, msg: res.data.msg}
                    dispatch(failedAcct(payload));
                    dispatch(endloading());
                    setTimeout(() => {
                        dispatch(release());
                    }, 1000);
                }, 1000);
                
            }else{    
                setTimeout(() => {
                    cookies.set('login', res.data.token, { path: '/'})
                    dispatch(validToken());
                    dispatch(endloading());
                }, 1000);           
                
            }
        }, (error) => {
            dispatch(endloading());
        });
    };
}
export const loginAcct = (formData,history) => {
    return function(dispatch, getState) {
        dispatch(loading());
        return axios.post('http://localhost:3000/login',formData )
        .then((response) => {
            let res = isJson(response);
            if(!res.data.status){
                setTimeout(() => {
                    let payload = {name: res.data.name, msg: res.data.msg}
                    dispatch(failedAcct(payload));
                    dispatch(endloading());
                    setTimeout(() => {
                        dispatch(release());
                    }, 2000);
                }, 1000);
                
            }else{    
                setTimeout(() => {
                    cookies.set('login', res.data.token, { path: '/'})
                    dispatch(login());
                    dispatch(endloading());
                    history.push('/')
                }, 1000);           
                
            }
        }, (error) => {
            dispatch(endloading());
        });
    };
}
export const openAcct = (formData,history) => {
    return function(dispatch, getState) {
        return axios.post('http://localhost:3000/open-account',formData, {headers: {'x-token': cookies.get('login')}} )
        .then((response) => {
            let res = isJson(response);
            if(res.data.status){
                dispatch(updateBank(res.data.res));
                setTimeout(() => {
                    history.push(`/bank/${formData.country}/${formData.bank.replace(/\s/g, '-')}/${res.data.res.Acct}`)
                }, 3000);
                
                
            }else{  
                if(!res.data.tok){
                    dispatch(invalidToken(res.data.msg))
                    cookies.remove('login')
                }    
                dispatch(openAcctErr(res.data.msg));          
                
            }
        }, (error) => {
            dispatch(openAcctErr(error));  
        });
    };
}

