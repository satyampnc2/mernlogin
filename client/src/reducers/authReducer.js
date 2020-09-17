import {SET_CURRENT_USER,USER_LOADING} from '../actions/types'
import isEmpty from 'is-empty'

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user: {}
}


export default function(state=initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING :
            return {
                ...state,
                isLoading : false
            }
        default:
            return state;
    }
}