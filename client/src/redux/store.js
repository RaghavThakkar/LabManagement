import { configureStore } from '@reduxjs/toolkit'
import  {userReducer}  from '../redux/auth-redux'
import{combineReducers} from 'redux'

export default configureStore({
    reducer: combineReducers({
        user:userReducer,
    })
})