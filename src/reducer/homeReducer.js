import produce from 'immer'
import { GETBANKS, GETBANK_STOP_LOADING, GETBANK_LOADING, LOAD_TRANSACTION, DISPLAY_ACCTS,
    STOP_LOAD_TRANSACTION, UPLOAD_TRANSACTION, UPDATE_BANK, REMOVE_OVERLAY, DISPLAY_OVERLAY } from '../action'
// import {TRANS_TYPE} from '../b_action'
const initialState = {
    bank: [],
    transaction: [],
    user: {},
    tloading: false,
    loading: false,
    create: false,
    transLoading: false,
    side: false,
    displayedAcct: [],
}

export default function homeReducer(state = initialState, action) {
    switch (action.type){
        case DISPLAY_ACCTS: {
            return produce(state, draft => {
                draft.displayedAcct = action.payload   
			})
        }
        case REMOVE_OVERLAY: {
            return produce(state, draft => {
                draft.side = false    
			})
        }
        case DISPLAY_OVERLAY: {
            return produce(state, draft => {
                draft.side = true		    
			})
        }
        case UPDATE_BANK: {
            return produce(state, draft => {
                draft.bank.push(action.payload) ;
                draft.create = true		    
			})
        }
        case GETBANKS: {
            return produce(state, draft => {
                draft.bank = action.payload.bank ;	
                draft.transaction = action.payload.transaction ;
                draft.user = action.payload.user ;
                draft.loading = false ;		    
			})
        }
        case GETBANK_LOADING: {
            return produce(state, draft => {
			    draft.loading = true ;			    
			})
        }
        case GETBANK_STOP_LOADING: {
            return produce(state, draft => {
			    draft.loading = false ;			    
			})
        }
        case UPLOAD_TRANSACTION: {
            return produce(state, draft => {
			    draft.transaction = action.payload ;			    
			})
        }
        case LOAD_TRANSACTION: {
            return produce(state, draft => {
			    draft.tloading = true ;			    
			})
        }
        case STOP_LOAD_TRANSACTION: {
            return produce(state, draft => {
			    draft.tloading = false ;			    
			})
        }
        default:{
            return state;
        }
    }
}