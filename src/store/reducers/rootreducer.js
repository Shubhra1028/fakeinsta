import { combineReducers } from 'redux'
import postReducer from './posts'
import authReducer from './authReducer'

import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth : authReducer,
    posts : postReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
})

export default rootReducer;