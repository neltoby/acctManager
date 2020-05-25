import produce from 'immer'
// import produce from 'immer'
import { B_LOAD_STOP, B_ERR_TRUE, B_READY, GEN_KEY_LOADING, KEY_STOP_LOADING, GEN_KEY, DIALOG_OPEN,
    TRANS_LOADING, TRANS_LOADING_STOP, TRANS_ERR, MERGED_SAVING, MERGED_SAVING_FALSE, CANCEL_TRANS,
    TRANS_SUCCESS, CONFIRM_TRANS, END_TRANS, EXPIRED_KEY, UPDATE_KEY, TOP_UP_LOADING, DIALOG_CLOSE,
    STOP_TOP_UP_LOADING, TRANS_TYPE, LOADING_TRANS_VIEW, UPDATE_TRANS_RESULT,STOP_LOADING_TRANS_VIEW, 
    SELECT_KEY_TIME, SELECT_KEY_TIME_CANCEL, SET_EXPIRED_TIME } from '../b_action'
import { SET_BANKS, GETBANKS, CHECK_DISPLAY, CHECK_DISPLAY_FALSE, ACCOUNT_BAL, CHECK_BAL_ERR,
    CHECK_BAL_LOADING, CHECK_BAL_LOADING_STOP, STATEMENT_ACCESS, STATEMENT_DENIED, STATEMENT,
    STATEMENT_LOADING, STATEMENT_LOADING_STOP, STATEMENT_ERR } from '../action'

const initialState = {
    bankMatchLoading: true,
    errorResponse: false,
    errText: '',
    readyDisplay: true,
    banks: [],
    genKeyLoading: false,
    genKey: {},
    inputs: {bank: '', acct: '', key: '', pin: '', amt: ''},
    transLoading: false,
    transErr: '',
    merged: false,
    transConfirm: {},
    success: false,
    expires: '',
    topUp: {transLoading: false},
    transType: {type:'', val: ''},
    loadingTransView: false,
    allTransResult: [],
    transTypeResult: [],
    showDialog: false,
    checkDisplay: false,
    accountBal: {},
    balLoading: false,
    checkBalErr: '',
    statementAccess: {},
    statement: {},
    statementLoading: false,
    statementErr: '',
    selectKeyTime: false,
}

export default function transReducer(state = initialState, action) {
    console.log(state.statement)
    switch (action.type){  
        case SET_EXPIRED_TIME: {
            return produce(state, draft => {	
                draft.expires= action.payload     
			})
        }      
        case SELECT_KEY_TIME: {
            return produce(state, draft => {	
                draft.selectKeyTime= true ;	    
			})
        }
        case SELECT_KEY_TIME_CANCEL: {
            return produce(state, draft => {	
                draft.selectKeyTime= false ;	    
			})
        }
        case STATEMENT_ERR: {
            return produce(state, draft => {	
                draft.statementErr = action.payload ;	    
			})
        }
        case STATEMENT_LOADING: {
            return produce(state, draft => {	
                draft.statementLoading = true ;	    
			})
        }
        case STATEMENT_LOADING_STOP: {
            return produce(state, draft => {	
                draft.statementLoading = false ;	    
			})
        }
        case STATEMENT: {
            return produce(state, draft => {
                let id = action.payload.bid	
                console.log(id)
                draft.statement[id] = action.payload 	    
			})
        }
        case STATEMENT_ACCESS: {
            return produce(state, draft => {
                let id = action.payload
                console.log(id)
                draft.statementAccess[id] = true    
			})
        }
        case STATEMENT_DENIED: {
            return produce(state, draft => {	
                let id = action.payload
                console.log(id)
                draft.statementAccess[id] = false	     
			})
        }
        case CHECK_BAL_LOADING: {
            return produce(state, draft => {	
                draft.balLoading = true ;	    
			})
        }
        case CHECK_BAL_LOADING_STOP: {
            return produce(state, draft => {	
                draft.balLoading = false ;	    
			})
        }
        case CHECK_BAL_ERR: {
            return produce(state, draft => {	
                draft.checkBalErr = action.payload ;	    
			})
        }
        case ACCOUNT_BAL: {
            return produce(state, draft => {	
                draft.accountBal = action.payload ;	    
			})
        }
        case CHECK_DISPLAY: {
            return produce(state, draft => {	
                draft.checkDisplay = true ;	    
			})
        }
        case CHECK_DISPLAY_FALSE: {
            return produce(state, draft => {	
                draft.checkDisplay = false ;	    
			})
        }
        case DIALOG_CLOSE: {
            return produce(state, draft => {	
                draft.showDialog= false ;	    
			})
        }
        case DIALOG_OPEN: {
            return produce(state, draft => {	
                draft.showDialog= true ;	    
			})
        }
        case GETBANKS: {
            return produce(state, draft => {	
                draft.allTransResult = action.payload.transaction ;	    
			})
        }
        case TRANS_TYPE:{
            return produce(state, draft => {
                draft.transType = action.payload
                if(action.payload.type === 'transfer'){
                    if(action.payload.val === 'all'){
                        draft.transTypeResult = state.allTransResult.filter((item) => {
                            if(item.TransType === 'Transfer' && item.AcctId == action.payload.id) return item
                        })
                    }else{
                        let all = state.allTransResult.filter((item) => {
                            if(item.TransType === 'Transfer' && item.AcctId == action.payload.id) return item
                        })
                        draft.transTypeResult = all.slice(0,5)
                    }
                }else{
                    if(action.payload.val === 'all'){
                        draft.transTypeResult = state.allTransResult.filter((item) => {
                            if(item.TransType === 'TopUp' && item.AcctId == action.payload.id) return item
                        })
                    }else{
                        let all = state.allTransResult.filter((item) => {
                            if(item.TransType === 'TopUp' && item.AcctId == action.payload.id) return item
                        })
                        draft.transTypeResult = all.slice(0,5)
                    }
                }	    
			})
        }  
        case LOADING_TRANS_VIEW:{
            return produce(state, draft => {
                draft.loadingTransView = true    
			})
        }
        case STOP_LOADING_TRANS_VIEW:{
            return produce(state, draft => {
                draft.loadingTransView = false    
			})
        }
        case UPDATE_TRANS_RESULT:{
            return produce(state, draft => {
                draft.transResult = action.payload    
			})
        }
        case TOP_UP_LOADING:{
            return produce(state, draft => {
                draft.topUp.transLoading = true	    
			})
        }
        case STOP_TOP_UP_LOADING:{
            return produce(state, draft => {
                draft.topUp.transLoading = false    
			})
        }
        case UPDATE_KEY:{
            return produce(state, draft => {
                draft.genKey.code = action.payload	    
			})
        }
        case EXPIRED_KEY:{
            return produce(state, draft => {
                draft.genKey.status = action.payload	    
			})
        }
        case TRANS_SUCCESS:{
            return produce(state, draft => {
                draft.success= true	    
			})
        }
        case END_TRANS:{
            return produce(state, draft => {
                draft.success= false    
			})
        }
        case CANCEL_TRANS:{
            return produce(state, draft => {
                draft.transConfirm= action.payload	    
			})
        }   
        case CONFIRM_TRANS:{
            return produce(state, draft => {
                draft.transConfirm= action.payload	    
			})
        } 
        case MERGED_SAVING:{
            return produce(state, draft => {
                draft.merged = true	    
			})
        }
        case MERGED_SAVING_FALSE:{
            return produce(state, draft => {
                draft.merged = false    
			})
        }
        case TRANS_ERR:{
            return produce(state, draft => {
                draft.transErr = action.payload	    
			})
        }
        case TRANS_LOADING_STOP:{
            return produce(state, draft => {
                draft.transLoading = false    
			})
        }
        case TRANS_LOADING:{
            return produce(state, draft => {
                draft.transLoading = true	    
			})
        }
        case GEN_KEY_LOADING:{
            return produce(state, draft => {
                draft.genKeyLoading = true	    
			})
        }
        case KEY_STOP_LOADING:{
            return produce(state, draft => {
                draft.genKeyLoading = false		    
			})
        }
        case GEN_KEY:{
            return produce(state, draft => {
                draft.genKey = action.payload		    
			})
        }
        case B_LOAD_STOP:{
            return produce(state, draft => {
                draft.bankMatchLoading = false		    
			})
        }
        case B_ERR_TRUE:{
            return produce(state, draft => {
                draft.errorResponse = true
                draft.errText = action.payload 
			})
        }
        case B_READY:{
            return produce(state, draft => {
                draft.readyDisplay = true
                draft.errorResponse = false	    
			})
        }
        case SET_BANKS:{
            return produce(state, draft => {
                draft.banks = action.payload	    
			})
        }
        default:{
            return state;
        }
    }
}