import produce from 'immer'
import { INVALID_TOKEN, VALID_TOKEN } from '../action'

const initialState = {
    tokenError: false,
    tokenMessage: '',
}

export default function tokenReducer(state = initialState, action) {
    switch (action.type){
        case INVALID_TOKEN: {
            return produce(state, draft => {
                draft.tokenError = true ;	
                draft.tokenMessage = action.payload ;		    
			})
        }
        case VALID_TOKEN: {
            return produce(state, draft => {
                draft.tokenError = false ;	
                draft.tokenMessage = '' ;		    
			})
        }
        default:{
            return state;
        }
    }
}