import authReducer from './authReducer'
import errorReducer from './errorReducer'
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    auth:authReducer,
    errors:errorReducer
})

export default rootReducer;