import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootreducer'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase, authIsReady } from 'react-redux-firebase';
import fbConfig from './config/fbconfig'

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady : true}),
        reduxFirestore(fbConfig)
    )
)

authIsReady(store).then(()=>{
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    serviceWorker.unregister();
})
