import produce from 'immer'
import { LOGGEDIN, LOGGEDOUT, FAILED_ACCT, STOP_LOADING, LOADING, RELEASE, 
        LOGGING_OUT, CANCEL_LOGOUT} from '../action'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const initialState = {
    login: cookies.get('login') ? 'LOGGEDIN' : 'LOGGEDOUT',
    error: '',
    name: '',
    loading: false,
    loggingOut: false,
}

export default function createReducer(state = initialState, action) {
    switch (action.type){
        case LOGGING_OUT:{
            return produce(state, draft => {
			    draft.loggingOut = true ;			    
			})
        }
        case CANCEL_LOGOUT:{
            return produce(state, draft => {
			    draft.loggingOut = false ;			    
			})
        }
        case LOGGEDIN:{
            return produce(state, draft => {
			    draft.login = LOGGEDIN ;			    
			})
        }
        case LOGGEDOUT:{
            return produce(state, draft => {
			    draft.login = LOGGEDOUT ;			    
			})
        }
        case FAILED_ACCT:{
            return produce(state, draft => {
                draft.error = action.payload.msg ;	
                draft.name = action.payload.name ;		    
			})
        }
        case RELEASE:{
            return produce(state, draft => {
                draft.error = '' ;	
                draft.name = '' ;		    
			})
        }
        case STOP_LOADING:{
            return produce(state, draft => {
			    draft.loading = false ;			    
			})
        }
        case LOADING:{
            return produce(state, draft => {
			    draft.loading = true ;			    
			})
        }
        default:{
            return state;
        }
    }
}